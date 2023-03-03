import { useParams } from "react-router-dom";
import "./Question.css";
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
function Question(props) {
  const [questionData, setQuestionData] = useState();
  const [responseJSON, setResponseJSON] = useState();
  const [code, setCode] = useState(" ");
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
      console.log("error getting Course data");
    } else {
      let responseJSON= await response.json();
      setQuestionData(responseJSON);
      if(code==""){
      setCode(responseJSON.baseCode)
      }
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setCode((prevData) => ( value    ));
  }

  useEffect(() => GetQuestionsFromApi, []);

  return (
    <div className="Question">
      <div className="Code">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label><Button variant="primary" type="submit">
        Submit
      </Button></Form.Label>
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
        <a href="  ">name</a>
      </div>
    </div>
  );
}
export default Question;
