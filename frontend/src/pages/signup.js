import React, { useState } from "react";
import axios from "axios";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Make HTTP request to register user
    try {
      const response = await axios.post("http://localhost:3001/register", formData);
      console.log(response.data); // Log the response from the server
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };
  
  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            placeholder="Enter first name"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            placeholder="Enter last name"
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
