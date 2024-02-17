import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = ({mode}) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2 className={`text-${mode === 'dark'?'light':'dark'}`}>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className={`form-lable text-${mode === 'dark'?'light':'dark'}`} >Title</label>
                    <input type="text" className="form-control border border-primary rounded" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className={`form-lable text-${mode === 'dark'?'light':'dark'}`}>Description</label>
                    <input type="text" className="form-control border border-primary rounded" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className={`form-lable text-${mode === 'dark'?'light':'dark'}`}>Tag</label>
                    <input type="text" className="form-control border border-primary rounded" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
                </div>
               
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote