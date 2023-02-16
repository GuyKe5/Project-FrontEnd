import {useState,useEffect} from "react"
import "../Login/Login.css";
function AddCourse(props){
    const [formData,setFormData] = useState({name:'',description:''});
     function handleSubmit(){
        const response = fetch()
    }
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    }
    return(
        
        <div className="AddCourse">
            <h1>Creat Course</h1>
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
            </form>

                
        </div>
    )
}
export default AddCourse;