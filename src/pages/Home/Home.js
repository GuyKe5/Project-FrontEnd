import Qcard from "../../Components/Qcard"
import "./Home.css";
function Home() {
    return (
        <div className="Home">
            <div className="CardsWrap">
               
            <Qcard />
            <Qcard />
           <h2>שאלות בביצוע </h2>
            </div>

            <div className="CardsWrap">
               
               <Qcard />
               <Qcard />
              <h2>שאלות מומלצות </h2>
               </div>
                           
        </div>
    );


}
export default Home; 