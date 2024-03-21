import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Nav, NavLink, NavMenu } from "react-router-dom";
import SunIcon from "../components/icon/Sunicon";
import MoonIcon from "../components/icon/Moonicon";
import "../styles/navbar.scss";
import logo from "../assets/stocklogo.png";
import Cookies from "universal-cookie";
const cookies = new Cookies();


const user_id = cookies.get("user_id");

const user_email = cookies.get("email");


const Navbar = (props) => {
  const [dark, setDark] = useState(false);

  const toggleDarkMode = () => {
    setDark(!dark);
  };

  const { dispatch, state } = props;
  const user_id = cookies.get("user_id");
  console.log("User ID:", user_id);

  const handleLogout = () => {
    cookies.remove("user_id");
    dispatch({ type: "SET_LOGIN_STATE" });
  };

    return (
        <>
            <nav className="nav">
                <div className="nav-logo">
                    <NavLink to="/stock" activeclassname="active">
                        <img src={logo} alt="logo" />
                    </NavLink>
                </div>
                <div className="nav-menu">
                    <NavLink to="/stock" className="nav-link" activeclassname="active">
                        Overview
                    </NavLink>
                    <NavLink to="/blogs" className="nav-link" activeclassname="active">
                        Blogs
                    </NavLink>
                    <NavLink to="/watchlist" className="nav-link" activeclassname="active">
                        My Watchlist
                    </NavLink>
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
                                <div className="nav-user">Logged in as: <span>{user_email}</span></div>
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
                <div className="dark-mode" onClick={toggleDarkMode}>
                    {dark ? <SunIcon /> : <MoonIcon />}
                </div>
            </nav>
        </>
    );
};

export default Navbar;

