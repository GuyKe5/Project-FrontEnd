import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";
import Login from "../Login/Login";

function Register(props) {
  const navigate = useNavigate();
   const[errorMsg,setErrorMsg]=useState('')
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [ResponseData, setResponseData] = useState();
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch("https://localhost:7162/api/User/Register", {
      method: "PUT",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      //  body: '{\n"username":"yosi",\n"password":"123",\n"email": "dfd"\n}',
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
        email: formData.email,
      }),
    });

    setResponseData(response);
    console.log(response);
   
    if (response.status == "404") {
      setErrorMsg("username already taken");
    } 
    else if (response.status != "200") {
      setErrorMsg("unknown error");
      }
    

    if (response != null && response.ok) {
        setErrorMsg("");
      //succses
      console.log("logged in");
      props.setUser(formData);
      props.setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(formData));
      localStorage.setItem("isLoggedIn", true);
      navigate("/");
    }
    else{
        if (response.status == "404") {
            setErrorMsg("username already taken");
          } 
          else  {
            setErrorMsg("unknown error");
            }
    }
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
          email:
        </div>
        <button type="submit">Submit</button>
        <div style={{ color: "red" }}>{errorMsg}</div>
      </form>
    </div>
  );
}

export default Register;
