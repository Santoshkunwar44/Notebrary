import { useContext, useEffect } from "react";
import "./Notes.css";
import noteContext from "./Notecontext";
import Noteitem from "../NoteItems/Noteitem";
export default function Notes({showAlert}) {
  const { notes, setNotes, addNote, fetchallNote } = useContext(noteContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchallNote();
    }else{
      window.location.replace("/signin")
    }
  }, [notes]);

  return (
    <>
     
      <div className="notesWrapper">
        {notes.length===0 && "NO NOTES TO DISPLAY" }
        {notes.map((note, index) => {
          return <Noteitem key={index} noteVal={note} showAlert={showAlert}/>;
        })}
      </div>
    </>
  );
}
