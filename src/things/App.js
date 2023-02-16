import "./App.css";
import Home from  "../pages/Home/Home"
import Question from "../pages/Question/Question"
import ListCourses from "../pages/ListCourses/ListCourses"
import NavBar from"../Components/NavBar"
import Login from"../pages/Login/Login"
import Course from"../pages/Course/Course"
import Register from"../pages/Register/Register"
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Alert, Breadcrumb, Card } from "react-bootstrap/";
import {Route,Routes} from "react-router-dom"

import React, { useState, useEffect } from 'react';
function App() {
  const[IsLoggedIn,setIsLoggedIn] = React.useState(false)
  const[User,setUser] = React.useState();
  useEffect(()=>{
    const userData = localStorage.getItem("user");
    const isLoggedInData = localStorage.getItem("isLoggedIn");
    if (userData!== null && isLoggedInData=='true') {
    const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
      setIsLoggedIn(localStorage.getItem("isLoggedIn"));
    }
    
  },[])

  return (
    <div className="App">
      
      <NavBar />
      <Routes>
        <Route path="/" element={<Home User={User} setUser={setUser} IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/Question/:id" element ={<Question/>} />
        <Route path="/ListCourses" element ={<ListCourses/>} />
        <Route path="/Register" element ={<Register/>} />
        {/* <Route path="/Course" element={<Course User={User} id={location.state?.id} />} /> */}

        <Route path="/Course/:id" element={<Course User={User}  />} />


        <Route path="/Login" element ={<Login User={User} IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>} />
      </Routes>

    </div>
  );
}

export default App;
