import "./App.css";
import Home from  "../pages/Home/Home"
import Question from "../pages/Question/Question"
import ListQuestions from "../pages/ListQuestions/ListQuestions"
import NavBar from"../Components/NavBar"
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Alert, Breadcrumb, Card } from "react-bootstrap/";
import {Route,Routes} from "react-router-dom"
function App() {
  return (
    <div className="App">
      
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Question/:id" element ={<Question/>} />
        <Route path="/ListQuestions" element ={<ListQuestions/>} />
      </Routes>

    </div>
  );
}

export default App;
