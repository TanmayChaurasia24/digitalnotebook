import React, { useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    // console.log(location.pathname);
  }, [location]);
  const loginbutton = () => {
    navigate("/login")
  }
  const signupbutton = () => {
    navigate("/signup")
  }
  const logoutbutton = () => {
    localStorage.removeItem("token");
    navigate("/")
  }
  const { mode, togglemode } = props;
  useEffect(()=>{
   if(location.pathname === '/' && mode === 'dark') {
    togglemode();
   } 
  },[location.pathname,togglemode])
  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} aria-current="page" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">
                  About
                </Link>
              </li>
            </ul>

            {location.pathname !== "/"?(<div className="form-check form-switch d-flex align-items-center" style={{ marginRight: 20 }}>
              <input className="form-check-input mx-3" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={togglemode} />
              <label className={`form-check-label text-${mode === 'dark' ? 'light' : 'dark'}`} for="flexSwitchCheckChecked">{mode === 'dark' ? 'Light Mode' : 'Dark Mode'}</label>
            </div>):""}

            {!localStorage.getItem('token') ? <div className="mx-3 ">
              <button className="btn btn-primary btn-sm mx-3" onClick={signupbutton}>
                signup
              </button>
              <button className="btn btn-primary btn-sm" onClick={loginbutton}>
                login
              </button>
            </div> : <button className="btn btn-sm btn-primary" onClick={logoutbutton}>logout</button>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;


