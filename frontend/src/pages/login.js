import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // };

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // make a popup alert showing the "submitted" text
    alert("Submited");
    // set configurations
    const configuration = {
      method: "post",
      url: "https://nodejs-mongodb-auth-app.herokuapp.com/login",
      data: {
        email,
        password,
      },
    };
    // make the API call
    axios(configuration)
      .then((result) => {
        setLogin(true);
      })
      .catch((error) => {
        error = new Error();
      });
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
