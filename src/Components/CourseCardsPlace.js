import { useEffect, useState } from "react";
import Ccard from "./Ccard";
import "./ComponentsCss.css";
function CourseCardsPlace(props) {
    let responseJSON;
    const [response, setResponse] = useState([]);
    async function callApi(id) {
      const apiResponse = await fetch(
        `https://localhost:7162/api/Course/GetEnrolledCourses?id=${id}`,
        {
          headers: {
            Accept: "*/*",
          },
        }
      );
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
      if (props.IsLoggedIn) {
        callApi(props.User.id);
      }
    }, [props.User,props.IsLoggedIn]);
  
    return (
      <div className="CardsWrap">
        {response}
        <h2  style={{ textAlign: 'center' ,height:"100%" ,marginTop:"auto", marginBottom:"auto"}}>הקורסים שלי</h2>
      </div>
    );
  }
  export default CourseCardsPlace;
  