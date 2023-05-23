import { Link } from "react-router-dom";
import Ccard from "../../Components/Ccard";
import CourseCardsPlace from "../../Components/CourseCardsPlace";
import { useEffect, useState } from "react";
import "../../Components/ComponentsCss.css";
function ListCourses(props) {
    let responseJSON;
    const [response, setResponse] = useState([]);
    async function callApi() {
      const apiResponse = await fetch('https://localhost:7162/api/Course/GetAllCourses', {
        headers: {
            'accept': '*/*'
        }
    });
      responseJSON = await apiResponse.json();
      setResponse(responseJSON.map((item) => {
        return (
          <Ccard 
            key={item.id}
            name={item.name}
            date={item.date.split('T')[0]}
            description={item.description}
            id={item.id}
            User={props.User}
          />
        )
      }));
    }
  
    useEffect(() => {
     
        callApi(props.User.id)
      }
    , []);
  
    return (
      <div className="CardsWrap2">
        {response}
        <h2  style={{ textAlign: 'center' ,height:"100%" ,marginTop:"auto", marginBottom:"auto"}}> כל הקורסים</h2>
      </div>
    );
  }
  export default ListCourses;
  