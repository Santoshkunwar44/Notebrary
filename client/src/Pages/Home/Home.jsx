import React from "react";
import { useContext, useEffect } from "react";
import noteContext from "../../components/Notes/Notecontext";
import Createnote from "../../components/creteNote/Createnote";
import Sidebar from "../../components/Sidebar/Sidebar"
import "./Home.css";
import Notes from "../../components/Notes/Notes";
export default function Home() {
  const { state, update } = useContext(noteContext);

  return (
    <>
      <div className="homeWrapper">
        {/* <Sidebar/> */}
        <div className="homeMain">
          <Createnote />
          <Notes />
        </div>
      </div>
      {/* <Notes/> */}
    </>
  );
}
