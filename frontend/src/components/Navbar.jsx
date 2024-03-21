import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SunIcon from "./Sunicon";
import MoonIcon from "./Moonicon";
import "../styles/navbar.scss";
import logo from "../assets/stocklogo.png"


const Navbar = () => {
    const [dark, setDark] = useState(false);

    const toggleDarkMode = () => {
        setDark(!dark);
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
                    <NavLink to="/contact" className="nav-link" activeclassname="active">
                        Contact
                    </NavLink>
                </div>
                <div className="nav-signup">
                    <NavLink to="/sign-up" className="nav-link" activeclassname="active">
                        Sign Up
                    </NavLink>
                    <span className="nav-link-divider">/</span>
                    <NavLink to="/login" className="nav-link" activeclassname="active">
                        Login
                    </NavLink>
                </div>
                <div className="dark-mode" onClick={toggleDarkMode}>
                    {dark ? <SunIcon /> : <MoonIcon />}
                </div>
            </nav>
        </>
    );
};

export default Navbar;

