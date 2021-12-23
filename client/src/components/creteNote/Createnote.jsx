import React from "react";
import "./Createnote.css";
import Notes from "../Notes/Notes"

export default function Createnote() {
  return (
    <div className="createnoteWrapper">
      <div className="createnoteAddInput">
        <i class="pinNote fas fa-thumbtack"></i>
        <input type="text" placeholder="Add a note.." />
        <input multiple="true" type="text" placeholder="description" />
        <div className="createnoteIcons">
          <ul className="createnoteIconsUl">
            <i class="fas fa-inbox"></i>

            <i class="fas fa-palette"></i>
            <i class="fas fa-ellipsis-v"></i>
          </ul>
        </div>
      </div>
    
    </div>
  );
}
