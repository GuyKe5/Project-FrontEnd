import React, { useState ,useEffect} from "react";
import { json, useLocation, useParams } from "react-router-dom";
 import { useNavigate } from 'react-router-dom'
import { Button, Card, Form } from "react-bootstrap";


import "./AddQuestion.css";

function AddQuestion(props) {
  const [msg, setMsg] = useState("");
  const location = useLocation();
  let ci
  let question

  if(location.state){
    ci =location.state.courseId
    question =location.state.question
  }

  const navigate = useNavigate();
  if(!props.IsLoggedIn){  navigate("/Login")}
  const [formData, setFormData] = useState({
    writerId: props.User?.id || '', 
    courseId: ci,
    questionname: "",
    description: "",
    soulutionCode: "", 
    baseCode: "",
    tests: [{ input: "", output: "", name: "" }],
    edit: -1,
  });
 
  const  [response,setResponse] =useState()
  useEffect(() => {
    if (location.state &&location.state.question) {
      async function fetchData() {
        try {
          const questionResponse = await fetch(
            `https://localhost:7162/api/Course/GetFullQuestionFromQuestionId?qId=${location.state.question.id}`,
            {
              headers: {
                Accept: "*/*",
              },
            }
          );
  
          const testsResponse = await fetch(
            `https://localhost:7162/api/Question/GetTestFromQuestionId?id=${location.state.question.id}`,
            {
              headers: {
                accept: "*/*",
              },
            }
          );
  
          if (questionResponse.ok && testsResponse.ok) {
            const questionData = await questionResponse.json();
            const tests = await testsResponse.json();
              console.log(questionData.id)
            setFormData((prevData) => ({
              ...prevData,
              questionname: questionData && questionData.name ? questionData.name : "",
              writerId: props.User?.id || '', 
              description: questionData && questionData.prompt ? questionData.prompt : "",
              soulutionCode: questionData && questionData.solution ? questionData.solution : "",
              baseCode: questionData && questionData.baseCode ? questionData.baseCode : "",
              tests: tests ? tests : [{ input: "", output: "", name: "" }],
              edit: questionData && questionData.id ? questionData.id : -1,
            }));
          } else {
            console.log("Error retrieving question and tests data");
          }
        } catch (error) {
          console.log("Error fetching question and tests:", error);
        }
      }
  
      fetchData();
    }
  }, [location.state]);
  

  function handleChange(event, index) {
    const { name, value } = event.target;
    const tests = [...formData.tests];
    tests[index][name] = value;
    setFormData((prevData) => ({ ...prevData, tests }));
  }

  function handleAddTest() {
    const tests = [...formData.tests];
    tests.push({ input: "", output: "", name: "" });
    setFormData((prevData) => ({ ...prevData, tests }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      console.log(formData)
       const response = await fetch(
        "https://localhost:7162/api/Question/AddQuestion",
        {
          method: "PUT",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
       
      );
      setResponse(response)
      
      if (response.ok) {
        setMsg("success adding question");
        console.log("success adding question");
      }
    } catch {
      console.log("error in addQuestion");
    }
  }
 

  return (
    <div className="AddQuestion">
      <Form onSubmit={handleSubmit}>
        <h1>Add Question</h1>
        <Form.Group controlId="questionname">
          <Form.Label>שם:</Form.Label>
          <Form.Control
            type="text"
            name="questionname"
            value={formData.questionname}
            onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>תיאור:</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={formData.description}
            onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })}
          />
          </Form.Group>
           <Form.Group controlId="baseCode">
          <Form.Label>קוד התחלתי:</Form.Label>
          <Form.Control
            type="text"
            name="baseCode"
            value={formData.baseCode}
            onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="soulutionCode">
          <Form.Label>פתרון:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="soulutionCode"
            value={formData.soulutionCode}
            onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })}
          />
        </Form.Group>

        <h2>בדיקות</h2>
        {formData.tests.map((test, index) => (
          <Card key={index}>
            <Card.Body>
              <Form.Group controlId={`tests[${index}].name`}>
                <Form.Label>שם הבדיקה:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="test name"
                  value={test.name}
                  onChange={(event) => handleChange(event, index)}
                />
              </Form.Group>
              <Form.Group controlId={`tests[${index}].input`}>
                <Form.Label>קלט:</Form.Label>
                <Form.Control
                  type="text"
                  name="input"
                  placeholder="input"
                  value={test.input}
                  onChange={(event) => handleChange(event, index)}
                />
              </Form.Group>
              <Form.Group controlId={`tests[${index}].output`}>
            <Form.Label>פלט:</Form.Label>
            <Form.Control
              type="text"
              name="output"
              placeholder="output"
              value={test.output}
              onChange={(event) => handleChange(event, index)}
            />
          </Form.Group>
        </Card.Body>
      </Card>
    ))}
    <Button className="add-test-btn" onClick={handleAddTest}>
      הוספת בדיקה
    </Button>
    <br></br> <br></br>
    <Button className="submit-btn" type="submit">
          submit
    </Button> 
    <div style={{ color: 'red'  }}>{(response!=null&&response.status!=200 )&& "couldn't add questoin pls try again later"}</div>
    <div style={{color:'green'}}>{msg}</div>
  </Form>
</div>
);
}

export default AddQuestion;