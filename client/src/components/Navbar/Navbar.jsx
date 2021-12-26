import { useEffect } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
export default function Navbar({ showAlert }) {
  const location = useLocation();
  const logoutHandle = () => {

    window.location.replace("/login");
    localStorage.removeItem("token");
    showAlert("Logged out successfully","success");
  };
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    <>
      <div className="navWrapper">
        <div className="navTitle">
          <h2>NOTEBRARY</h2>
        </div>
        <div className="navContent">
          <ul className="navListItems">
            <li>
              <Link
                to="/"
                className={`  nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                HOME
              </Link>
            </li>

            {localStorage.getItem("token") ? (
              <>
                {" "}
                <li style={{ paddingTop: "8px" }} onClick={logoutHandle}>
                  LOGOUT
                </li>{" "}
              </>
            ) : (
              <>
                <li>
                  <Link
                    className={`  nav-link ${
                      location.pathname === "/login" ? "active" : ""
                    }`}
                    to="/login"
                  >
                    LOGIN
                  </Link>
                </li>

                <li>
                  <Link
                    className={` nav-link  ${
                      location.pathname === "/signin" ? "active" : ""
                    }`}
                    to="/signin"
                  >
                    SIGNUP
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                className={`  nav-link ${
                  location.pathname === "/setting" ? "active" : ""
                }`}
                to="/setting"
              >
                SETTING
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
