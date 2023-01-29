    import React, { useState, useEffect } from 'react';
    import "./Login.css"

    function Login(){
        const [formData, setFormData] = useState({ username: '', password: '' });
        const[ResponseData,setResponseData]= useState()
        function handleChange(event) {
            const { name, value } = event.target;
            setFormData(prevData => ({ ...prevData, [name]: value }));
        }
        
        async function handleSubmit(event) {    
            event.preventDefault();
            const response = await fetch('https://localhost:7162/api/Values', {
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
            
            const response1 = await response.json();
            setResponseData(response1);
            console.log("resposne: ");console.log(response1);
        }
        

        


        return(

            <div className="Login">
                <form onSubmit={handleSubmit}>
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
                <div style={{ color: 'red'  }}>{ResponseData!=null&&ResponseData.hasOwnProperty('error') && ResponseData.error}</div>
                </form>
            </div>
        )
    }

    export default Login;