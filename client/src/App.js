import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./Pages/Home/Home";
import Signin from "./Pages/SignIn/Signin";
import Login from "./Pages/Login/Login";
import Setting from "./Pages/setting/Setting";
import { Route, Routes } from "react-router-dom";
import NoteState from "./components/Notes/Notestate";
import Alert from "./components/Alerts/Alert";
import { useState } from "react";

function App() {
  const [alert,setAlert] =useState(null)
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type,
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
    console.log(message,type)
  }
  return (
    <>
      <NoteState>
        <Navbar showAlert={showAlert} />
        <Alert alert={alert} />
        <Routes>
          <Route path="/" element={<Home  showAlert={showAlert} />} />
          <Route path="/login" element={<Login   showAlert={showAlert} />} />
          <Route path="/signin" element={<Signin  showAlert={showAlert} />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
