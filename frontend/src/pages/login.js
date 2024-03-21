import "../styles/login.scss";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const LoginPage = (props) => {
  const { dispatch, state } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", { email, password });
      console.log(response.data);

      // Set a cookie with the value of the user
      cookies.set("user_id", response.data.userId, { path: "/" });
      cookies.set("email", response.data.email, { path: "/" });
      // Change login state to true
      dispatch({ type: "SET_LOGIN_STATE" });
    } catch (error) {
      console.log(error);
      alert("Login failed!");
    }
  };


  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newId, setNewId] = useState("");

  const handleLogout = () => {
    // Dispatch an action to reset the login state
    dispatch({ type: "SET_LOGIN_STATE" });
    cookies.remove("user_id");
    cookies.remove("email");
  };

  const handleChangeEmail = async () => {
    try {
      const user_id = cookies.get("user_id");
      console.log("User ID:", user_id);
      // Make an HTTP request to change the email
      const response = await axios.put("http://localhost:3001/login", {
        email: newEmail, id: user_id
      });
      console.log(response.data);
      alert("Email changed successfully!");
    } catch (error) {
      console.error("Error changing email:", error);
      alert("Failed to change email. Please try again.");
    }
  };

  const handleChangePassword = async () => {
    try {

      const user_id = cookies.get("user_id");
      console.log("User ID:", user_id);
      // Make an HTTP request to change the password
      const response = await axios.put("http://localhost:3001/login", {
        password: newPassword, id: user_id
      });
      console.log(response.data);
      alert("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password. Please try again.");
    }
  };


  const handleDelete = async () => {
    try {
      const user_id = cookies.get("user_id");
      console.log("User ID:", user_id);
      // Make an HTTP request to delete the user account
      const response = await axios.delete("http://localhost:3001/register", {
        data: { id: user_id } // Include the user ID in the request body
      });
      console.log(response.data);
      alert("User deleted successfully!");
      handleLogout(); // Log out the user after deleting the account
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };













  const user_id = cookies.get("user_id");
  const user_email = cookies.get("email")
  console.log("User ID:", user_id);

  // Conditionally render based on login state
  if (!user_id) {
    return (
      <form onSubmit={handleSubmit} className="login-form">
        {/* email */}
        <div controlId="formBasicEmail" className="form-group">
          <div>
            <h2>Login</h2>
          </div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="form-control"
          />
        </div>

        {/* password */}
        <div controlId="formBasicPassword" className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="form-control"
          />
        </div>

        {/* submit button */}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    );


  } else {
    return <div className="login-form">
      <div className="form-group">
        <div>
          <h2>Manage Your Account</h2>
        </div>
        <label htmlFor="email">Change Email</label>
        <div className="form-change">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter new email"
            className="form-control"
          />
          <button className="btn-change" onClick={handleChangeEmail}>Change</button>
        </div>

      </div>
      <div className="form-group">
        <label htmlFor="password">Change Password</label>
        <div className="form-change">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="form-control"
          />
          <button className="btn-change" onClick={handleChangePassword}>Change</button>
        </div>
      </div>
      <div className="form-group">
<label htmlFor="password">Delete User - {user_id}</label>
<div className="form-change">
  <input
   type="text"
   value={newId}
   onChange={(e) => setNewId(e.target.value)}
   placeholder="Input account ID to delete your account"
    className="form-control"
  />
  <button className="btn-change" onClick={handleDelete}> Delete </button>
</div>
</div>
    </div>;




  }
};

export default LoginPage;
