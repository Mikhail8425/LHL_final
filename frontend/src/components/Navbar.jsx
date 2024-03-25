import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Nav, NavLink, NavMenu } from "react-router-dom";
import SunIcon from "../components/icon/Sunicon";
import MoonIcon from "../components/icon/Moonicon";
import "../styles/navbar.scss";
import logo from "../assets/stocklogo.png";
import darklogo from "../assets/darkmodelogo.png"
import Cookies from "universal-cookie";
const cookies = new Cookies();


const user_id = cookies.get("user_id");

const user_email = cookies.get("email");
const user_username = cookies.get("user_name");


const Navbar = (props) => {

  const { dispatch, state, toggleDarkMode, darkMode } = props;
  const user_id = cookies.get("user_id");
 

  const handleLogout = () => {
    cookies.remove("user_id");
    cookies.remove("user_name");
    cookies.remove("email");
    dispatch({ type: "SET_LOGIN_STATE" });
  };

  return (
    <>
      <nav className={`nav${darkMode ? 'dark-mode-nav' : ''}`}>
        <div className="nav-logo">
          <NavLink to="/stock" activeclassname="active">
            <img src={darkMode? darklogo : logo} alt="logo" />
          </NavLink>
        </div>
        <div className="nav-menu">
        {user_id && (
          <NavLink to="/stock" className="nav-link" activeclassname="active">
            Overview
          </NavLink>
        )}
          {/* Conditionally render Plans link if user_id is true */}
          {user_id && (
            <NavLink to="/Plans" className="nav-link" activeclassname="active">
              Plans
            </NavLink>
          )}
          <NavLink to="/discussionboard" className="nav-link" activeclassname="active">
            Blogs
          </NavLink>
          {user_id && (
          <NavLink to="/watchlist" className="nav-link" activeclassname="active">
            My Watchlist
          </NavLink>
          )}
          <NavLink to="/about" className="nav-link" activeclassname="active">
            About Us
          </NavLink>
          <NavLink to="/emailform" className="nav-link" activeclassname="active">
            Contact
          </NavLink>
          {user_id ? (
            <NavLink to="/login" className="nav-link" activeStyle>
              Manage Account
            </NavLink>
          ) : (
            ""
          )}
        </div>
        <div className="nav-signup">
          {user_id ? (
            <>
              <div className="logged-in">
                <div className="nav-user">Logged in as: <span>{user_username}</span></div>
                <span>/</span>
                <button className="nav-link" onClick={handleLogout}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/sign-up" className="nav-link" activeclassname="active">
                Sign Up
              </NavLink>
              <span className="nav-link-divider">/</span>
              <NavLink to="/login" className="nav-link" activeclassname="active">
                Login
              </NavLink>
            </>
          )}
        </div>
        <div className="dark-mode" onClick={() =>toggleDarkMode()}>
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

