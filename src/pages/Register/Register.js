import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";

function Register(props) {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false); 

  function handleChange(event) {
    const { name, value } = event.target;
    const updatedValue = value.trim();
    setFormData((prevData) => ({ ...prevData, [name]: updatedValue }));
  }
  

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true); 

    try {
      const response = await fetch("https://localhost:7162/api/User/Register", {
        method: "PUT",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          email: formData.email,
        }),
      });

      if (response.status === 404) {
        setErrorMsg("Username already taken");
      } else if (response.status === 403) {
        setErrorMsg("Email is not valid");
      } else if (response.status !== 200) {
        setErrorMsg("Unknown error");
      } else {
        setErrorMsg("");
       
        navigate("/Login");
      }
    } catch (error) {
      console.error("Request error:", error);
      setErrorMsg("An error occurred. Please try again.");
    }

    setIsLoading(false); // Set loading state back to false after response is received
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="space">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          :שם משתמש
        </div>
        <div className="space">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          :סיסמא
        </div>
        <div className="space">
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          email
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
        {isLoading && <div>Loading...</div>} {/* Display loading message or spinner */}
        <div style={{ color: "red" }}>{errorMsg}</div>
      </form>
    </div>
  );
}

export default Register;
