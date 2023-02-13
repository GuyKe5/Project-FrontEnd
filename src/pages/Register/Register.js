    import React, { useState, useEffect } from 'react';
    import { Navigate } from 'react-router-dom';
    import { useNavigate } from 'react-router-dom'
    import "./Register.css"

    function Register(props){
        const navigate = useNavigate();
        const [formData, setFormData] = useState({ username: '', password: '' });
        const[ResponseData,setResponseData]= useState()
        function handleChange(event) {
            const { name, value } = event.target;
            setFormData(prevData => ({ ...prevData, [name]: value }));
        }
        
        async function handleSubmit(event) {    
            event.preventDefault();
            const response = await fetch('https://localhost:7162/api/User/GetUserData', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                },
                // body: '{\n"username":"1",\n"password":"1"\n}',
                body: JSON.stringify({
                    'username': formData.username,
                    'password': formData.password
                })
            });
            
            const responseJSON = await response.json();

            setResponseData(responseJSON);
            if(responseJSON!=null&&!responseJSON.hasOwnProperty('error')){
                //succses
            }

        }
        

        


        return(

            <div className="Register">
                <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className="space">
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
                        :שם משתמש   
                
                </div>
                <div className="space">
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
                        :סיסמא
                </div>
                <div className="space">
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    email:
                </div>
                <button type="submit">Submit</button>
                <div style={{ color: 'red'  }}>{ResponseData!=null&&ResponseData.hasOwnProperty('error') && ResponseData.error}</div>
                </form>
            </div>
        )
    }

    export default Register;