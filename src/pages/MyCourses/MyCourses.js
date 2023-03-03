import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CoursesTable from "../../Components/CoursesTable"
import "../MyCourses/MyCourses.css";
 
function MyCourses(props){
    const [courses,setCourses] = useState()
    async function CallApi(){
        try{
        if(props.User){
        const response = await fetch(`https://localhost:7162/api/Course/GetCourseDataByWriterId?writerId=${props.User.id}`, {
            headers: {
                'accept': '*/*'
            }
        });
        const responseJson = await response.json()
        console.log(responseJson)
        setCourses( responseJson)
    }
    }
    catch(exce){
        console.log("error at try in CallApi at myCourses exce: "+exce)
    }
        
    }

    useState(CallApi,[])
    
    return(

        <div className="MyCourses">

            <h1> My Courses</h1>

                <CoursesTable courses={courses}></CoursesTable>


        </div>
    )

}

export default MyCourses;