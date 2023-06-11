import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Question.css";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
function Question(props) {
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState();
  const [tests, setTests] = useState();
  const [responseJSON, setResponseJSON] = useState();
  const [code, setCode] = useState("");
  const { id } = useParams();
  async function GetQuestionsFromApi() {
   
    const response = await fetch(
      `https://localhost:7162/api/Course/GetFullQuestionFromQuestionId?qId=${id}`,
      {
        headers: {
          Accept: "*/*",
        },
      }
    );
    if (!response.ok) {
      console.log("error getting question data");
    } else {
      let responseJSON= await response.json();
      setQuestionData(responseJSON);
      console.log(questionData)
      if(code==""){
      setCode(responseJSON.baseCode)
      }
    }
  }

  async function GetTestsFromApi() {
    const response2 = await fetch(`https://localhost:7162/api/Question/GetTestFromQuestionId?id=${id}`, {
      headers: {
          'accept': '*/*'
      }
  });
  
    if (!response2.ok) {
      console.log("error getting tests data");
    } else {
      let responseJSON2= await response2.json();
      setTests(responseJSON2);
      
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setCode((prevData) => ( value    ));
  }

  async function handleSubmit(event) {    
    event.preventDefault();
    // Navigate to={"/Test"} state={{code:"123",StarTests:"456"}} 
   
  }

  useEffect(() => {
    GetQuestionsFromApi();
    GetTestsFromApi();
}, []);


  return (
    <div className="Question">
      <div className="Code">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>   
              
            <Link
  as={Link}
  to={"/Test/"}
  state={{ code: code, StarTest: tests, solution: questionData, qId: id }}
  style={{
    display: 'inline-block',
    padding: '10px',
    backgroundColor: 'blue', 
    color: 'white', 
    textDecoration: 'none',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  }}
>
  submit
</Link>

 

      </Form.Label>
            <Form.Control
              name="code"
              value={code}
              onChange={handleChange}
              as="textarea"
              rows={50}
            />
          </Form.Group>
        </Form>
      </div>

      <div className="Text">
        <h1 style={{ textDecorationLine: "underline" }}>
          {questionData && questionData.name}
        </h1>
        <div className="discription">{questionData && questionData.prompt}</div>
      </div>
    </div>
  );
}
export default Question;
