import "./Course.css";
import Table from 'react-bootstrap/Table';
import { useEffect,useState } from "react";
import {useParams} from "react-router-dom";
function QuestionTable(props) {
    const questionRows= props.questions.map((question,index)=>{
        return(
            <tr key={question.id}>
            <td>{index+1}</td>
            <td>{question.name}</td>
            <td>{question.id}</td>
            <td>@mdo</td>
          </tr>
        )
    }

    )
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
        <tbody>
         {questionRows}
        </tbody>
      </Table>
    );
  }


function Course(props){
    const [tableQuestions,setTableQuestions] = useState();
    const[ responseJSON,setResponseJSON] = useState();
    let { id } = useParams();
  async function GetQuestionsFromApi(){
    
        const response = await fetch(`https://localhost:7162/api/Course/GetQuestionsFromCourseId?id=${id}`, {
            headers: {
              Accept: "*/*"
            }
          })
        setResponseJSON (await response.json())
        return responseJSON;
    }


    useEffect(() => {
        const GetData = async () => {
          const data = await GetQuestionsFromApi();
          setTableQuestions(data);
        };
        GetData();
      }, []);
      

    return(
        <div className="course">
            hello i am course
            <h1>Course Name</h1>
                { responseJSON!=null&&<QuestionTable questions={responseJSON}/>}



        </div>
    );

}
export default Course;




