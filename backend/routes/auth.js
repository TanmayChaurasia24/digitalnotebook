const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')
const JWT_token = "tanmayJWTtoken2026"

//-------------------------------------------------------------ROUTE: 1-------------------------------------------------------------
// created an api for user registration /api/auth/createuser
router.post('/createuser', [
    body('name').isLength({ min: 2 }), // name length should be minimum of 2 characters
    body('email').isEmail(), // validating the email field using a custom method in our User model
    body('password').isLength({ min: 5 }), // validating that passwod length should be of minimum 5 characters
], async (req, res) => {
    const result = validationResult(req); // checking that whatever user has entered that is correct or not
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() }); // return error when there is a error in data that user has entered
    }
    try { // if there is no error in the data that user has returned then run this try block
        let user = await User.findOne({ email: req.body.email });
        if (user) { // check that the user with the emailID  does not already exist in the database
            return res.status(400).json({ error: "Sorry, a user with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10); // creating salt for securing the password
        const secpass = await bcrypt.hash(req.body.password, salt); // creating the hash for the  password and combining it with the salt
        // if the user with the same email id does not exixts then create that user in the database
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass
        });

        const data = {
            user: {
                id: user.id
            }
        }

        const jwt_data = jwt.sign(data, JWT_token)
        res.json({ jwt_data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//-------------------------------------------ROUTE: 2-----------------------------------------------------------------------------------------------------
// authenticate a user with /api/auth/login
router.post('/login', [
    body('email', 'enter a valid email').isEmail(), // validating the email field using a custom method in our User model
    body('password', 'password cannnot be blank').exists() // we have to enter the password it is important
], async (req, res) => {
    const result = validationResult(req); // checking that whatever user has entered that is correct or not
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() }); // return error when there is a error in data that user has entered
    }

    // when user have entered correct email and password
    const { email, password } = req.body; // destructure email and password form req.body
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "please try ot login with correct credentials" })
        }
        const validPassword = await bcrypt.compare(password, user.password); // compare the given password with the stored one
        if (!validPassword) {
            return res.status(400).json({
                error: "please enter correct credentials"
            })
        }

        // when both the email and password are correct of the user
        const data = {
            user: {
                id: user.id
            }
        }

        const jwt_data = jwt.sign(data, JWT_token)
        res.json({ jwt_data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

});


//-------------------------------------------ROUTE: 3-----------------------------------------------------------------------------------------------------
// get logged in user detail using post api/auth/getuser
router.post('/getuser', fetchUser, async (req, res) => {
    try {   
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
