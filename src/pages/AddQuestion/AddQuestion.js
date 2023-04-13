import React, { useState ,useEffect} from "react";
import { useLocation, useParams } from "react-router-dom";
 import { useNavigate } from 'react-router-dom'
import { Button, Card, Form } from "react-bootstrap";

import "./AddQuestion.css";

function AddQuestion(props) {
  const location = useLocation();
  let ci
  if(location.state){
    ci =location.state.courseId
    console.log(ci)
  }

  const navigate = useNavigate();
  if(!props.IsLoggedIn){  navigate("/Login")}
  const [formData, setFormData] = useState({
    writerId: props.User?.id || '', 
    courseId: ci,
    questionname: "",
    description: "",
    soulutionCode: "",
    tests: [{ input: "", output: "", name: "" }],
  });
 
  const  [response,setResponse] =useState()
  useEffect(() => {
    if (props.question) {
      setFormData(props.question);
    }
  }, [props.question]);

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
      
      console.log(response);
      if (response.ok) {
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
  </Form>
</div>
);
}

export default AddQuestion;