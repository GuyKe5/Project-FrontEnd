import "./Login.css"
function Login(){

    return(
        <div className="Login">
            
            <h1>Login</h1>
            <div className="space">
            <input type="text"/>
                    :שם משתמש   
               
            </div>
            <div className="space">
            <input type="text"/>
                    :סיסמא
               
            </div>
            <input type="submit"/>
        </div>
    )
}

export default Login;