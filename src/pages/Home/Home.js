import Qcard from "../../Components/Ccard"
import CourseCardsPlace from "../../Components/CourseCardsPlace";
import "./Home.css";
function Home(props) {
    
        if(props.IsLoggedIn){
        
    }
    return (
        <div className="Home">
          {props.IsLoggedIn&&<h2>hello {props.User.username}</h2>}
            <CourseCardsPlace User={props.User} IsLoggedIn={props.IsLoggedIn} />
                           
        </div>
    );


}
export default Home; 