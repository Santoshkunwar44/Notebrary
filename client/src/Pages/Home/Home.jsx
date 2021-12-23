import React from 'react'
import Createnote from '../../components/creteNote/Createnote'
import Notes from '../../components/Notes/Notes'
import Sidebar from '../../components/Sidebar/Sidebar'
import "./Home.css"
export default function Home() {
    return (
        <>
             <div className='homeWrapper'>
            {/* <Sidebar/> */}
            <Createnote/>
     
        </div>
        <Notes/>
        </>
   
    )
}
