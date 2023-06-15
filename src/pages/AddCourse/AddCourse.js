import {useState,useEffect} from "react"
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";
function AddCourse(props){
   
    const navigate = useNavigate();
     useEffect(()=>{if(!props.IsLoggedIn){navigate('/login')}},[])
    const [formData,setFormData] = useState({name:'',description:''});
    const [msg,setMsg] = useState("")
    const [goodMsg,setGoodMsg]=useState("")
   
    async function handleSubmit(event){
        event.preventDefault();
        try{
        const response = await fetch ('https://localhost:7162/api/Course/AddCourse', {
            method: 'PUT',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            },
            // body: '\n{\n"name":"f"\n}',
            body: JSON.stringify({
                'name': formData.name,
                'description' : formData.description,
                'writer' : props.User.id
            })
        });
        console.log(response)
        if(response.ok){
            
            console.log("succes adding course")
            setGoodMsg("The course was added succefully")
        }



    }
    catch{
        console.log("error in addCourse")
    }

        
    }
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    }
    return(
        
        <div className="AddCourse">
            <h1>Create Course</h1>
            <form onSubmit={handleSubmit}>
                <div className="space">
                <input type="text" name="name" value={formData.name} onChange={handleChange}/>
              : שם 
                </div>
                <div className="space">
                <input type="text" name="description" value={formData.description} onChange={handleChange}/>
                : תיאור 
                </div>
                <button type="submit"> submit</button>
                <div style={{ color: 'red'  }}>{msg}</div>
                <div style={{ color: 'green'  }}>{goodMsg}</div>
            </form>

                
        </div>
    )
}
export default AddCourse;