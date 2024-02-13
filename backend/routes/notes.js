const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// -----------------------------------------------------------ROUTE 1-----------------------------------------------------------------------------
// get all the notes with GET request
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//-----------------------------------------------------------------------------ROUTE 2---------------------------------------------------------------
router.post('/addnotes', fetchUser, [
    body('title', "minimum length of title should be 2").isLength({ min: 2 }), // name title should be minimum of 2 characters
    body('description', "minimum length of description should be 5").isLength({ min: 5 }), // validating the description field using a custom method in our User model
], async (req, res) => {
    const result = validationResult(req); // checking that whatever user has entered that is correct or not
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() }); // return error when there is a error in data that user has entered
    }
    try {
        const { title, description, tag } = req.body;
        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savenote = await note.save();
        res.json(savenote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//---------------------------------------------------ROUTE 3---------------------------------------------------------------------------------------------
// route to update an existing node with  PUT method
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        // create new note object which will store all the notes
        const newnote = {};
        if (title) { newnote.title = title };
        if (description) { newnote.description = description };
        if (tag) { newnote.tag = tag };

        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("not found") }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("not allowed") }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

//-------------------------------------------------------------ROUTE 4----------------------------------------------------------------------------------------------
// route to delete the existing node with DELETE method
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("not found") } // if we dont find the note then  return this message

        // if the note does not belong to the user who is deleting the note the display this message
        if (note.user.toString() !== req.user.id) { return res.status(401).send("not allowed") }

        // if it belongs to the user then
        await Note.findByIdAndDelete(req.params.id);

        res.send("note has been deleted")

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }



});

module.exports = router;
