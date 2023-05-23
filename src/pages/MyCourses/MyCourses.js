import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CoursesTable from "../../Components/CoursesTable";
import "../MyCourses/MyCourses.css";

function MyCourses(props) {
  const [courses, setCourses] = useState();
  const [error, setError] = useState(false); // New error state
  const navigate = useNavigate();

  async function CallApi() {
    try {
      if (!props.User) {
        return;
      }


      const response = await fetch(`https://localhost:7162/api/Course/GetCourseDataByWriterId?writerId=${props.User.id}`, {
        headers: {
          accept: "*/*",
        },
      });


      if (!response.ok) {
        setError(true);
        return;
      }

      const responseJson = await response.json();
      setCourses(responseJson);
    } catch (exce) {
      setError(true); 
    }
  }

  useEffect(() => {
    CallApi();
  }, [props.User]);

  // Check if the user is not logged in, then navigate to the login page
  if (!props.IsLoggedIn) {
    return navigate("/login");
  }

  return (
    <div className="MyCourses">
      <h1> My Courses</h1>
      {error ? 
        <p>An error occurred while fetching courses.</p> :
      
        <CoursesTable courses={courses} />
      
      }
    </div>
  );
}

export default MyCourses;