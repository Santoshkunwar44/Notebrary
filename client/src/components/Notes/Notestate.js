import { useState } from "react";
import NoteContext from "./Notecontext";

const NoteState = (props) => {
  const host = "http://localhost:8000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  //GET ALL THE NOTES

  const fetchallNote = async () => {
    //todo api call
    const response = await fetch(`${host}/api/note/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
    });
    const json = await response.json();

    setNotes(json.message);
  };

  //ADD A NOTE
  const addNote = async (title, description, tag) => {
    //todo api call
    try {
      const response = await fetch(`${host}/api/note/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
    } catch (err) {
      // console.log(err.json)
      // console.log(err.message.error);
    }
  };

  //DELETE A NOTE

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/note/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
    });

    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  //EDIT A NOTE
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/note/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      console.log(json);
    } catch (err) {
      console.log(err);
    }
  };

  // REGISTER
  const register = async (name, email, password) => {
    try {
      const response = await fetch(`${host}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ email, name, password }),
      });
      const json = await response.json();
      console.log(json);
    } catch (err) {
      console.log(err);
    }
  };

  //LOGIN
  const login = async (email, password) => {
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      console.log(json);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        editNote,
        fetchallNote,
        register,
        login,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
