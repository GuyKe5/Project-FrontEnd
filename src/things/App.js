import "./App.css";
import Home from  "../pages/Home/Home"
import Question from "../pages/Question/Question"
import ListCourses from "../pages/ListCourses/ListCourses"
import NavBar from"../Components/NavBar"
import Login from"../pages/Login/Login"
import Course from"../pages/Course/Course"
import Register from"../pages/Register/Register"
import AddCourse from"../pages/AddCourse/AddCourse"
import MyCourses from"../pages/MyCourses/MyCourses"
import AddQuestion from"../pages/AddQuestion/AddQuestion"
import Test from"../pages/Test/Test"
import SignOut from "../pages/Login/SignOut";
import CoursePanel from "../pages/CoursePanel/CoursePanel";
import AdminPage from "../pages/AdminPage/AdminPage"
import DeleteCourse from "../pages/DeleteCourse/DeleteCourse"
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Alert, Breadcrumb, Card } from "react-bootstrap/";
import {Route,Routes} from "react-router-dom"

import React, { useState, useEffect } from 'react';
function App() {
  const[IsLoggedIn,setIsLoggedIn] = React.useState(false)
  const[User,setUser] = React.useState({});
  useEffect(()=>{
    const userData = localStorage.getItem("user");
    const isLoggedInData = localStorage.getItem("isLoggedIn");
    if (userData!== null && isLoggedInData=='true') {
    const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
      setIsLoggedIn(isLoggedInData);
    }
    
  },[])

  return (
    <div className="App">
      
      <NavBar User ={User} />
      <Routes>
        <Route path="/" element={<Home User={User} setUser={setUser} IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/Question/:id" element ={<Question/>} />
        <Route path="/ListCourses"  element={<ListCourses User={User} setUser={setUser} IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path="/Register" element ={<Register User={User} setUser={setUser} IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/Test" element ={<Test User={User} IsLoggedIn={IsLoggedIn}/>} />
        {/* <Route path="/Course" element={<Course User={User} id={location.state?.id} />} /> */}

        <Route path="/Course/:id" element={<Course User={User} IsLoggedIn={IsLoggedIn} />} />

        <Route path="/SignOut" element={<SignOut User={User} setUser={setUser} IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />

        <Route path="/Login" element ={<Login User={User} IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>} />
        <Route path="/AddCourse" element ={<AddCourse User={User} IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>} />
        <Route path="/MyCourses" element ={<MyCourses User={User} IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>} />
        <Route path="/AddQuestion" element ={<AddQuestion User={User} IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>} />
        <Route path="/CoursePanel" element ={<CoursePanel User={User} IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>} />
        <Route path="/AdminPage" element ={<AdminPage User={User} IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>} />
        <Route path="/DeleteCourse/:id" element ={<DeleteCourse User={User} IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>} />
      </Routes>

    </div>
  );
}

export default App;
