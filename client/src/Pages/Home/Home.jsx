import React from "react";

import Createnote from "../../components/creteNote/Createnote";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.css";
import Notes from "../../components/Notes/Notes";
export default function Home({ showAlert }) {
  return (
    <>
      <div className="homeWrapper">
        {/* <Sidebar/> */}
        <div className="homeMain">
          <Createnote showAlert={showAlert} />
          <Notes showAlert={showAlert} />
        </div>
      </div>
    </>
  );
}
