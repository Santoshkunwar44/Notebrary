import "./Createnote.css";
import { useEffect } from "react";
import { useContext, useState } from "react";
import noteContext from "../Notes/Notecontext";
export default function Createnote({showAlert}) {
  const [length, setLength] = useState(false);
  const { notes, setNotes, addNote } = useContext(noteContext);
  const [note, setNote] = useState({ title: "", description: "", tags: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tags);
    setNote({
      title: "",
      description: "",
      tags: "",
    });
    showAlert("Note Added Successfully","success")
  };
  useEffect(() => {
    if (note.title.length >= 4 && note.description.length >= 4) {
      setLength(true);
    } else {
      setLength(false);
    }
    console.log("change");
  }, [note]);

  const onChanged = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="createnoteWrapper">
      <div className="createnoteAddInput">
        <form action="" onSubmit={handleSubmit}>
          <i className="pinNote fas fa-thumbtack"></i>
          <input
            type="text"
            onChange={onChanged}
            name="title"
            value={note.title}
            placeholder="Add a note.."
          />
          <input
            type="text"
            onChange={onChanged}
            name="description"
            value={note.description}
            placeholder="description"
          />
          <input
            type="text"
            onChange={onChanged}
            name="tags"
            value={note.tags}
            placeholder="tag."
          />
          <div className="createnoteIcons">
            <ul className="createnoteIconsUl">
              <i className="fas fa-inbox"></i>

              <i className="fas fa-palette"></i>
              <i className="fas fa-ellipsis-v"></i>
            </ul>
          </div>
          <button style={{ display: length ? "block" : "none" }} type="submit">
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}
