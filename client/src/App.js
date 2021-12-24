import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./Pages/Home/Home";
import Signin from "./Pages/SignIn/Signin";
import Login from "./Pages/Login/Login";
import Setting from "./Pages/setting/Setting";
import { Route, Routes } from "react-router-dom";
import NoteState from "./components/Notes/Notestate";

function App() {
  return (
    <>
      <NoteState>
        
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
