import { Link } from "react-router-dom";

function ListCourses(){
    
    return(
        <div className="ListCourses">
            <h1>Course List</h1>
            <Link to="/Course/1">Course 1</Link> 
            <Link to="/Course/2">Course2</Link> 

        </div>
    )
}
export default ListCourses;