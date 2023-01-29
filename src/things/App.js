import "./App.css";
import Home from  "../pages/Home/Home"
import Question from "../pages/Question/Question"
import ListQuestions from "../pages/ListQuestions/ListQuestions"
import NavBar from"../Components/NavBar"
import Login from"../pages/Login/Login"
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Alert, Breadcrumb, Card } from "react-bootstrap/";
import {Route,Routes} from "react-router-dom"
import React from "react";
function App() {
  const[User,setUser] = React.useState({
    UserId:"",
    UserName:"",
    Password:"",
    Email:""
  });
  return (
    <div className="App">
      
      <NavBar />
      <Routes>
        <Route path="/" element={<Home User={User}/>} />
        <Route path="/Question/:id" element ={<Question/>} />
        <Route path="/ListQuestions" element ={<ListQuestions/>} />
        <Route path="/Login" element ={<Login User={User} setUser={setUser}/>} />
      </Routes>

    </div>
  );
}

export default App;
