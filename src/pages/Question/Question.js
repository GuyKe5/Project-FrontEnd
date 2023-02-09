import { useParams } from "react-router-dom";
import "./Question.css";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
function Question(props) {
  const [questionData, setQuestionData] = useState();
  const [responseJSON, setResponseJSON] = useState();
  const [formData, setFormData] = useState({ code: " " });
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
      let i = await response.json();
      setQuestionData(i);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  useEffect(() => GetQuestionsFromApi, []);

  return (
    <div className="Question">
      <div className="Code">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control
              name="code"
              value={formData.code}
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
