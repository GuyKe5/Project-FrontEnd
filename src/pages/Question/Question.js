import { useParams } from "react-router-dom";
import "./Question.css"
function Question(props){
    const {id} =useParams()
    return(
        <div className="Question">
            <div className="Code">
            <input type="file"/>
            </div>

            <div className="Text">
                    <h1>Question {id}</h1>
                    <div className="discription">some instruction</div>
                    <a href="  ">name</a>
            </div>

        </div>
        
    )
}
export default Question;