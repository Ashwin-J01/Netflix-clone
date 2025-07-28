import React,{useState} from "react";
import Header from "./Header";
import './Login.css';

const Login = () => {
    const [isLogin,setIsLogin]=useState(true);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [fullname,setFullname]=useState("");
    const logininHandler=()=>{
        setIsLogin(!isLogin);
    }
    const getInputData=(e)=>{
         e.preventDefault();
         console.log(fullname,email,password);
         setFullname("");
         setEmail("");
         setPassword("");
            }
  return (
	<div>
        <Header/>
        <div className="login-banner">
        </div>
        <form onSubmit={getInputData} className="login-form">
            <h1>{isLogin? "Login" :"Sign up"}</h1>
            <div className="login-form-container">
                {
                    !isLogin && <input value={fullname} onChange={(e)=>setFullname(e.target.value)} type='text' placeholder="fullname" />
                }
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder="email"/>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password'placeholder="password"/>
                <button className="login-button">{isLogin? "Login" :"Sign up"}</button>
                <p>{isLogin?  "New to Netflix?":"Already have an account?"}<span onClick={logininHandler}>{isLogin? "Signin":"Login"}</span></p>
            </div>
        </form>
	</div>
  );
}; 

export default Login;