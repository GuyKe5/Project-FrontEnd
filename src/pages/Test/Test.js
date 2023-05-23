import React, { useState, useEffect } from 'react';
    import { Navigate } from 'react-router-dom';
    import { useNavigate } from 'react-router-dom'
    import { useLocation, useParams } from "react-router-dom";
    import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
    import "./Test.css"
    import TestTable from "../../Components/TestTable"
function Test(props){
    const location = useLocation();
    let code
    let StarTests
    let qId
    let solution
  
  if(location.state){
    
    code =location.state.code
    qId =location.state.qId
    solution =location.state.solution.solution
    StarTests=location.state.StarTest

  }
    const[showSoulution,setShowSoulution] =useState(false)
    const [tests,setTests] = useState()
    async function CallApi(){
        try{
        if(props.User){
        const response = await fetch('https://localhost:7162/api/Question/SubmitAndCheckCode', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'code': code,
                'tests': StarTests
            })
        });
        
        const responseJson = await response.json()
       
        setTests(responseJson)
    }
    }
    catch(exce){
        console.log("error at try in CallApi at Test exce: "+exce)
    }
        
    }

    useEffect(()=>{CallApi()},[])
    return(
        <div className='Test'>
                <h1>עמוד בדיקה</h1>
                <TestTable tests={tests}/>

                {showSoulution&&<p>{solution}</p>}

                <div>
                <Link to={`/Question/${qId}`}>נסה שוב</Link>
                <Button variant="primary" onClick={()=>{ setShowSoulution((prev)=>{return !prev})}}>

        ראה פתרון
      </Button>

                </div>
        </div>
    )
}

export default Test;