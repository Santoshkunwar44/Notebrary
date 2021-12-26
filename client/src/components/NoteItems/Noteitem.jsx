import React, { useContext, useState } from "react";
import "../Notes/Notes.css";
import { useRef } from "react";
import noteContext from "../Notes/Notecontext";
export default function Noteitem({ noteVal,showAlert }) {
  const [updateNotes, setUpdateNotes] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const { notes, setNote, deleteNote, editNote } = useContext(noteContext);
  const ref = useRef(null);
  const updateNote = () => {
    setUpdateNotes(noteVal)
    ref.current.click();
   

  };
  const editHandle = (e_id, e_title, e_description, e_tag) => {
    editNote(e_id, e_title, e_description, e_tag);
    setUpdateNotes({ title: "", description: "", tag: "" });
    showAlert("Note Updated Successfully","success")
  };
  const onChanged = (e) => {
    setUpdateNotes({ ...updateNotes, [e.target.name]: e.target.value });
  };
  const deleteHandle=(id)=>{
    showAlert("Note Deleted Successfully","success")
    deleteNote(id)
  }
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        ref={ref}
        data-toggle="modal"
        data-target="#exampleModalCenter"
        style={{ display: "none" }}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                UPDATE NOTE
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              className="modal-body"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <input
                value={updateNotes.title}
                onChange={onChanged}
                style={{ border: "none", outline: "none", padding: "8px" }}
                type="text"
                name="title"
                id="title"
                placeholder="title"
              />
              <input
                value={updateNotes.description}
                onChange={onChanged}
                style={{ border: "none", outline: "none", padding: "8px" }}
                type="text"
                name="description"
                id="description"
                placeholder="description"
              />
              <input
                value={updateNotes.tag}
                onChange={onChanged}
                style={{ border: "none", outline: "none", padding: "8px" }}
                type="text"
                name="tag"
                id="tag"
                placeholder="tag"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                CANCEL
              </button>
              <button
                onClick={() =>
                  editHandle(
                    noteVal._id,
                    updateNotes.title,
                    updateNotes.description,
                    updateNotes.tag
                  )
                }
                data-dismiss="modal"
                type="button"
                className="btn btn-primary"
              >
                UPDATE NOTE
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="notesContainer">
        <div className="content">
          <p className="notesTitle">{noteVal.title}</p>
          <p className="notesDesc">{noteVal.description}</p>
          <p className="notesDesc">{noteVal.tag}</p>
          <p className="notesDesc">{noteVal.createdAt}</p>
        </div>

        <div className="noteitemIcons">
          <i className="fas fa-palette"></i>
          <i className="far fa-bell"></i>
          <i onClick={() => updateNote(noteVal)} className="far fa-edit"></i>
          <i className="fas fa-ellipsis-v"></i>
          <i onClick={() => deleteHandle(noteVal._id)} className="fas fa-trash"></i>
        </div>
      </div>
    </>
  );
}
