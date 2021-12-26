import { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Notecontext from "../../components/Notes/Notecontext";

import "./Signin.css";
export default function Signin({ showAlert }) {
  const { register } = useContext(Notecontext);
  const [showPwd, setshowPwd] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setmessage] = useState("");
  const [passwordLength, setPasswordLength] = useState(0);
  const userRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    const changedLength = password.length;
    setPasswordLength(changedLength);
  }, [password]);

  const submitHandle = async (e) => {
    e.preventDefault();
    const name = userRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password);
    const response = await fetch("http://localhost:8000/api/auth/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json({ email, password });

    if (json.success) {
      showAlert("Account Created  Successfully", "success");
      localStorage.setItem("token", json.message);
      window.location.replace("/");
    } else {
      showAlert("Invalid Credentials", "danger");
    }
  };

  // cons
  return (
    <div className="Register">
      <div className="RegisterWrapper">
        <span className="RegisterTitle">Register</span>
        <span
          className="errorMsg"
          style={{ display: message === "" ? "none" : "block" }}
        >
          {message}
        </span>
        <form onSubmit={submitHandle} className="RegisterForm">
          <label>Username</label>
          <input
            className="RegisterInput"
            type="text"
            placeholder="Username"
            ref={userRef}
            required
            autoComplete="false"
          />
          <label>Email</label>
          <input
            className="RegisterInput"
            type="email"
            placeholder="Email"
            ref={emailRef}
            required
            minLength={5}
            autoComplete="false"
          />
          <label>Password</label>
          <input
            className="RegisterInput"
            type={showPwd ? "text" : "password"}
            placeholder="Password"
            ref={passwordRef}
            minLength={5}
            autoComplete="false"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordLength >= 1 ? (
            showPwd ? (
              <i
                onClick={() => setshowPwd(!showPwd)}
                className=" show_hidePassword fas fa-eye"
              ></i>
            ) : (
              <i
                onClick={() => setshowPwd(!showPwd)}
                className=" show_hidePassword fas fa-eye-slash"
              ></i>
            )
          ) : null}
          <button type="submit" className="RegisterButton">
            Register
          </button>
        </form>
        <Link to="/signin">
          <button className="RegisterRegisterButton">REGISTER</button>
        </Link>
      </div>
    </div>
  );
}
