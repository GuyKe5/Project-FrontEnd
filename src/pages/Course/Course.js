import "./Course.css";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function QuestionTable(props) {
  const questionRows = props.questions.map((question, index) => {
    return (
      <tr key={question.id}>
        <td>{index + 1}</td>
        <td>{question.name}</td>
        <td><Link to={`/Question/${question.id }`}>link</Link></td>
        <td>{question.status}</td>
      </tr>
    );
  });
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Question Name</th>
          <th>Question id</th>
          <th>status</th>
        </tr>
      </thead>
      <tbody>{questionRows}</tbody>
    </Table>
  );
}

function Course(props) {
  const location = useLocation();
  let cn 
  if(location.state){
    cn =location.state.courseName
  }
 
  const [courseName,setCourseName]  =useState(cn);
  const [responseJSON, setResponseJSON] = useState();
  const { id } = useParams();
  async function GetQuestionsFromApi() {
    const response = await fetch(
      `https://localhost:7162/api/Course/GetQuestionsFromCourseId?courseId=${id}&userId=${props.User.id}`,
      {
        headers: {
          Accept: "*/*",
        },
      }
    );
    if (!response.ok) {
      console.log("error getting Course data");
    } else {
      setResponseJSON(await response.json());
      return responseJSON;
    }
  }

  useEffect(() => {
    const GetData = async () => {
      const data = await GetQuestionsFromApi();
    };
    GetData();
  }, []);

  return (
    <div className="course">
      <h1>{courseName}</h1>
      {responseJSON != null && <QuestionTable questions={responseJSON} />}
    </div>
  );
}
export default Course;
