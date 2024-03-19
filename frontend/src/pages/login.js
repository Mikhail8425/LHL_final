import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const handleSubmit = async (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // make a popup alert showing the "submitted" text
    try {
      const response = await axios.post("http://localhost:3001/login", {email, password});
      console.log(response.data); // Log the response from the server
      alert("Login successful!");
      setLogin(true);
    }
    catch (error) {
      console.log(error); // Log the error for debugging
      alert("Login failed!");
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {/* email */}
      <form controlId="formBasicEmail">
        <label>Email address</label>
        <input type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </form>

      {/* password */}
      <form controlId="formBasicPassword">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </form>
      {/* submit button */}
      <button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>Login</button>
    </form>
  );
};

export default LoginPage;
