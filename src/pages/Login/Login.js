    import React, { useState, useEffect } from 'react';
    import "./Login.css"

    function Login(){
        console.log("in login")
        const [formData, setFormData] = useState({ username: '', password: '' });

            const[ResponseData,setResponseData]= useState()
        function handleChange(event) {
            const { name, value } = event.target;
            setFormData(prevData => ({ ...prevData, [name]: value }));
        }
        
        async function handleSubmit(event) {    
            event.preventDefault();
            const response = await fetch('https://localhost:44349/web_service/WebService1.asmx?op=GetUserData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: 'example_username', password: 'example_password' })
            });
            const json = await response.json();
            setResponseData(json);
            console.log(json)   
            console.log("hello")
        }
        

        


        return(

            <div className="Login">
                
                <h1>Login</h1>
                <div className="space">
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
                        :שם משתמש   
                
                </div>
                <div className="space">
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
                        :סיסמא
                
                </div>
                <button type="submit">Submit</button>
            </div>
        )
    }

    export default Login;