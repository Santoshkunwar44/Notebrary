import React from 'react'
import "../Notes/Notes.css"
export default function Noteitem({notes}) {
    console.log(notes)
    return (
        <>
           <div className="notesContainer">
                <p className="notesTitle">{notes.title}</p>
                <p className="notesDesc">{notes.description}</p>
                <p className="notesDesc">{notes.createdAt}</p>
              </div>
        </>
    )
}
