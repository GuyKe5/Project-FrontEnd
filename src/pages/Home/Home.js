import Qcard from "../../Components/Ccard"
import CourseCardsPlace from "../../Components/CourseCardsPlace";
import { Link } from "react-router-dom";
import "./Home.css";
function Home(props) {
    
    return (
        <div className="Home">
            {props.IsLoggedIn&&<h2>hello {props.User.username}</h2>}
          <div className="welcome-section">
        <h1>Welcome to the Computer Science Question Platform!</h1>
        <p>Prepare yourself for coding challenges and expand your computer science knowledge.</p>
        <p>Students can complete various computer science questions, and teachers can upload new questions for students to solve.</p>
        {!props.IsLoggedIn && (
  <div>
    <Link to={"/Login/"}>Login</Link> to get started or{" "}
    <Link to={"/Register/"}>register</Link>
  </div>
)}

      </div>

          
            <CourseCardsPlace user={props.User} isLoggedIn={props.IsLoggedIn} />
                           
        </div>
    );


}
export default Home; 