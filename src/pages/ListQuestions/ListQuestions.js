import { Link } from "react-router-dom";

function ListQuestions(){
    
    return(
        <div className="ListQuestions">
            <h1>Question List</h1>
            <Link to="/Question/1">Question 1</Link> 
            <Link to="/Question/2">Question2</Link> 

        </div>
    )
}
export default ListQuestions;