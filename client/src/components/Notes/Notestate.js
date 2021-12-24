import { useState } from "react";
import NoteContext from "./Notecontext";

const NoteState = (props) => {


  const notesInitial=[
    {
      "_id": "61c31a2fbfcd7b974d189418",
      "user": "61c30abcf3d350f4be439775",
      "title": "starting the MERN journey",
      "description": "mastering the MERN ",
      "tag": "MERN",
      "createdAt": "2021-12-22T12:29:35.549Z",
      "__v": 0
    },
    {
      "_id": "61c5a832402f0bfc1a46b3e2",
      "user": "61c30abcf3d350f4be439775",
      "title": " the software development",
      "description": " the SOFTWARE ",
      "tag": "SOFTWARE",
      "createdAt": "2021-12-24T11:00:02.333Z",
      "__v": 0
    },
    {
      "_id": "61c31a2fbfcd7b974d189418",
      "user": "61c30abcf3d350f4be439775",
      "title": "starting the MERN journey",
      "description": "mastering the MERN ",
      "tag": "MERN",
      "createdAt": "2021-12-22T12:29:35.549Z",
      "__v": 0
    },
    {
      "_id": "61c5a832402f0bfc1a46b3e2",
      "user": "61c30abcf3d350f4be439775",
      "title": " the software development",
      "description": " the SOFTWARE ",
      "tag": "SOFTWARE",
      "createdAt": "2021-12-24T11:00:02.333Z",
      "__v": 0
    },
    {
      "_id": "61c31a2fbfcd7b974d189418",
      "user": "61c30abcf3d350f4be439775",
      "title": "starting the MERN journey",
      "description": "mastering the MERN ",
      "tag": "MERN",
      "createdAt": "2021-12-22T12:29:35.549Z",
      "__v": 0
    },
    {
      "_id": "61c5a832402f0bfc1a46b3e2",
      "user": "61c30abcf3d350f4be439775",
      "title": " the software development",
      "description": " the SOFTWARE ",
      "tag": "SOFTWARE",
      "createdAt": "2021-12-24T11:00:02.333Z",
      "__v": 0
    },
    {
      "_id": "61c31a2fbfcd7b974d189418",
      "user": "61c30abcf3d350f4be439775",
      "title": "starting the MERN journey",
      "description": "mastering the MERN ",
      "tag": "MERN",
      "createdAt": "2021-12-22T12:29:35.549Z",
      "__v": 0
    },
    {
      "_id": "61c5a832402f0bfc1a46b3e2",
      "user": "61c30abcf3d350f4be439775",
      "title": " the software development",
      "description": " the SOFTWARE ",
      "tag": "SOFTWARE",
      "createdAt": "2021-12-24T11:00:02.333Z",
      "__v": 0
    },
    {
      "_id": "61c31a2fbfcd7b974d189418",
      "user": "61c30abcf3d350f4be439775",
      "title": "starting the MERN journey",
      "description": "mastering the MERN ",
      "tag": "MERN",
      "createdAt": "2021-12-22T12:29:35.549Z",
      "__v": 0
    },
    {
      "_id": "61c5a832402f0bfc1a46b3e2",
      "user": "61c30abcf3d350f4be439775",
      "title": " the software development",
      "description": " the SOFTWARE ",
      "tag": "SOFTWARE",
      "createdAt": "2021-12-24T11:00:02.333Z",
      "__v": 0
    }
  ]
  const [notes,setNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider value={{notes,setNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
