import Qcard from "../../Components/Ccard"
import CourseCardsPlace from "../../Components/CourseCardsPlace";
import "./Home.css";
function Home(props) {
    { if(props.IsLoggedIn){console.log("user: "+props.User);console.log(props.User.username)}}
    return (
        <div className="Home">
          {props.IsLoggedIn&&<h2>hello {props.User.username}</h2>}
            <CourseCardsPlace/>
                           
        </div>
    );


}
export default Home; 