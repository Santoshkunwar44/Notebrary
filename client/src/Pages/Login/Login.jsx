import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Login.css";
import { useContext } from "react";
import noteContext from "../../components/Notes/Notecontext";
export default function Login(props) {
  const { login } = useContext(noteContext);
  const [showPwd, setshowPwd] = useState(false);
  const [passwords, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(0);
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    const changedLength = passwords.length;
    setPasswordLength(changedLength);
  }, [passwords]);

  const submitHandle = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password);
    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json({ email, password });
    if (json.success) {
      window.location.replace("/");
      props.showAlert("Logged In Successfully", "success");
      localStorage.setItem("token", json.message);
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  // cons
  return (
    <div className="login">
      <div className="loginWrapper">
        <span className="loginTitle">Login</span>
        
        <form onSubmit={submitHandle} className="loginForm">
          <label>Username</label>
          <input
            className="loginInput"
            type="email"
            placeholder="Email"
            ref={emailRef}
            required
            autoComplete="false"
            minLength={5}
          />
          <label>Password</label>
          <input
            className="loginInput"
            type={showPwd ? "text" : "password"}
            placeholder="Password"
            ref={passwordRef}
            autoComplete="false"
            minLength={5}
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
          <button type="submit" className="loginButton">
            LOGIN
          </button>
        </form>
        <Link to="/signin">
          <button className="loginRegisterButton">REGISTER</button>
        </Link>
      </div>
    </div>
  );
}
