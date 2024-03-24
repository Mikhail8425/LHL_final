import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import Cookies from "universal-cookie";
const cookies = new Cookies();


const user_id = cookies.get("user_id");

const user_email = cookies.get("email");


const Navbar = (props) => {
  const { dispatch, state } = props;
  const user_id = cookies.get("user_id");
  

  const handleLogout = () => {
    cookies.remove("user_id");
    dispatch({ type: "SET_LOGIN_STATE" });
  };


  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
          <NavLink to="/contact" activeStyle>
            Contact Us
          </NavLink>
          <NavLink to="/DiscussionBoard" activeStyle>
            Discussion Board
          </NavLink>
          <NavLink to="/home" activeStyle>
            Home
          </NavLink>
          <NavLink to="/watchlist" activeStyle>
            watchlist
          </NavLink>
          <NavLink to="/stock" activeStyle>
            Stock
          </NavLink>
          <NavLink to="/test" activeStyle>
            Test
          </NavLink>
          {user_id ? (
            <>
              <NavLink to="/login" activeStyle>
                Manage your Account
              </NavLink><div>Logged in as: {user_email} </div>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/sign-up" activeStyle>
                Sign Up
              </NavLink>
              <NavLink to="/login" activeStyle>
                Login
              </NavLink>
            </>
          )}
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;