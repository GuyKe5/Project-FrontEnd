
/* page that the MyCourses page will link to will let you to see all the questions in your course and edit them */
import React, { useState ,useEffect} from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useLocation, useParams } from "react-router-dom";


import { Link } from "react-router-dom";

import "./CoursePanel.css";

function QuestionPanel({ questions ,id}) {
  const questionRows = questions.map((question, index) => (
    <tr key={question.id}>
      <td>{index + 1}</td>
      <td>{question.name}</td>
  <td><Link to={`/Question/${question.id}`}>link</Link></td>
      <td>{ <Link as={Link} to= {"/AddQuestion/"} state={{ courseId:id, question:question}}> question </Link>}</td>
    </tr>
  ));

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Question Name</th>
            <th>Question link </th>
          <th>edit question</th>
          
        </tr>
      </thead>
      <tbody>{questionRows}</tbody>
    </Table>
  );
}

function CoursePanel(props) {
 
  const location = useLocation();
  let course
  let id
  if(location.state){
    course =location.state.course
    id =location.state.course.id
  }
  const [isOwner, setIsOwner] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [responseJSON, setResponseJSON] = useState(null);


  useEffect(() => {
    if (location.state) {
      setCourseName(location.state.courseName);
    }
    async function checkIfOwner() {
        if(!props.User.id){return}
        const response = await fetch(`https://localhost:7162/api/Course/GetCourseDataByWriterId?writerId=${props.User.id}`, {
            headers: {
              accept: "*/*",
            },
          });
          
          let json = await response.json();  //check if courseId is in the list of courses that the user is enrolled in
          console.log(json.id)
        if(json.find(x=>x.id===id)){
          setIsOwner(true);
        }
      }
      checkIfOwner();
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

    if (isOwner) {
      getQuestionsFromApi();
    }
  }, [isOwner, id, props.User.id]);



  return (
    <div className="course">
      <h1>{courseName}</h1>  
      {isOwner ? (
        responseJSON != null && <QuestionPanel questions={responseJSON} id={id} /> 
      ) : (
       <>you need to be the owner of this course to edit</>
      )}
    </div>
  );
}

export default CoursePanel;
