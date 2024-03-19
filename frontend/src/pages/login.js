import React, { useReducer, useState } from "react";
import axios from "axios";

const LoginPage = (props) => {
  const { dispatch, state } = props;
  // console.log('state', state)
  // console.log('props', props)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", { email, password });
      console.log(response.data);
      // Change login state to true
      dispatch({ type: "SET_LOGIN_STATE" });
    } catch (error) {
      console.log(error);
      alert("Login failed!");
    }
  };
  // console.log('state', state)
  return (
    <form onSubmit={handleSubmit}>
      {/* email */}
      <div controlId="formBasicEmail">
        <label>Email address</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </div>

      {/* password */}
      <div controlId="formBasicPassword">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>

      {/* submit button */}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;