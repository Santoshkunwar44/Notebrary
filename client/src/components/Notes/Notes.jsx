import { useContext } from "react";
import "./Notes.css";
import noteContext from "./Notecontext";
import Noteitem from "../NoteItems/Noteitem";
export default function Notes() {
  const { notes, setNotes } = useContext(noteContext);
  return (
    <>
      <div className="notesWrapper">
        {notes.map((note) => {
          return <Noteitem notes={note} />;
        })}
      </div>
    </>
  );
}
