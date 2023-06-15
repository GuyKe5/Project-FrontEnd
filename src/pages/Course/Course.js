import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import "./Course.css";

function QuestionTable({ questions }) {
  const questionRows = questions.map((question, index) => (
    <tr key={question.id}>
      <td>{index + 1}</td>
      <td>{question.name}</td>
      <td>
        <Link to={`/Question/${question.id}`}>link</Link>
      </td>
      <td>{question.status}</td>
    </tr>
  ));

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Question Name</th>
          <th>question</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>{questionRows}</tbody>
    </Table>
  );
}

function Course(props) {
  const location = useLocation();
  const { id } = useParams();
  const [courseName, setCourseName] = useState("");
  const [responseJSON, setResponseJSON] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (location.state) {
      setCourseName(location.state.courseName);
    }

    async function checkIfEnrolled() {
      const response = await fetch(
        `https://localhost:7162/api/Course/CheckIfEnrolled?UserId=${props.User.id}&CourseId=${id}`,
        {
          headers: {
            accept: "*/*",
          },
        }
      );

      if (response.ok) {
        setIsEnrolled(true);
      }
    }

    checkIfEnrolled();
  }, [location.state, props.User.id, id]);

  useEffect(() => {
    async function getQuestionsFromApi() {
      const response = await fetch(
        `https://localhost:7162/api/Course/GetQuestionsFromCourseId?courseId=${id}&userId=${props.User.id}`,
        {
          headers: {
            Accept: "*/*",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResponseJSON(data);
      } else {
        console.log("Error getting course data");
      }
    }

    if (isEnrolled || props.User.isAdmin) {
      getQuestionsFromApi();
    }
  }, [isEnrolled, id, props.User.id]);

   const enrollUser = async () => {
    if(!props.IsLoggedIn){
      alert("you need to login first")
      return;
    }
    const enrollResponse = await fetch(
      `https://localhost:7162/api/Course/Enroll?userId=${props.User.id}&courseId=${id}`,
      {
        method: "PUT",
        headers: {
          accept: "*/*",
        },
      }
    );

    if (enrollResponse.ok) {
      // User enrolled successfully
      setIsEnrolled(true);
    } else {
      console.log("Error enrolling");
    }
  };

  return (
    <div className="course">
      <h1 style={{marginBottom:'2%'}}>{courseName}</h1>
      {isEnrolled || props.User.isAdmin ? (
        responseJSON != null && <QuestionTable questions={responseJSON} />
      ) : (
       <>you need to <button onClick={enrollUser}>Enroll</button> in order see the course</>
      )}
    </div>
  );
}

export default Course;
