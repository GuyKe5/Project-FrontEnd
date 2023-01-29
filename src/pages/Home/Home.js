import Qcard from "../../Components/Qcard"
import QuestionCardsPlace from "../../Components/QuestionCardsPlace";
import "./Home.css";
function Home(props) {
    { if(props.IsLoggedIn){console.log(props.User);console.log(props.User.username)}}
    return (
        <div className="Home">
          {props.IsLoggedIn&&<h2>hello {props.User.user.username}</h2>}
            <QuestionCardsPlace/>
                           
        </div>
    );


}
export default Home; 