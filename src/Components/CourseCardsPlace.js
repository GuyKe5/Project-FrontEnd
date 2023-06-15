import { useEffect, useState } from "react";
import Ccard from "./Ccard";
import "./ComponentsCss.css";

function CourseCardsPlace(props) {
  let responseJSON;
  const [response, setResponse] = useState([]);

  async function callApi(id) {
    try {
      const apiResponse = await fetch(
        `https://localhost:7162/api/Course/GetEnrolledCourses?id=${id}`,
        {
          headers: {
            Accept: "*/*",
          },
        }
      );
      responseJSON = await apiResponse.json();
      setResponse(
        responseJSON.map((item) => (
          <Ccard
            key={item.id}
            name={item.name}
            date={item.date.split("T")[0]}
            description={item.description}
            id={item.id}
            User={props.User}
          />
        ))
      );
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  }

  useEffect(() => {
    if (props.isLoggedIn && props.user) {
      callApi(props.user.id);
    }
  }, [props.user, props.isLoggedIn]);

  return ( <>
    <h1>הקורסים שלי</h1>
    <div className="CardsWrap2" >
      {response}
     
    </div>
    </>
  );
}

export default CourseCardsPlace;
