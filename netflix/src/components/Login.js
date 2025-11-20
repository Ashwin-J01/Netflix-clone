import React,{ useState} from "react";
import Header from "./Header";
import './Login.css';
import axios from "axios";
import { API_END_POINT } from "../utils/constant";
import { loginUser } from "../services/auth";
import { toast } from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/userSlice";
const Login = () => {
    const [isLogin,setIsLogin]=useState(true);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [fullName,setFullName]=useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector((store) => store.app.isLoading);

    const logininHandler=()=>{
        setIsLogin(!isLogin);
    }
    const getInputData=async(e)=>{
         e.preventDefault();
         dispatch(setLoading(true));
         if(isLogin){
            const user={email,password};
            try{
                // use the central auth service which accepts an optional config
                const res = await loginUser(user.email, user.password, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                });
                if(res.data.success){
                    toast.success(res.data.message);
                }  
                dispatch(setUser(res.data.user));
                navigate("/browser");
            }catch(error){
                toast.error(error.response.data.message);
                console.log(error);
            } finally{
                dispatch(setLoading(false));
            }
         }else{
            dispatch(setLoading(true));
         const user={fullName,email,password};
         try{
                const res =await axios.post(`${API_END_POINT}/register`,user,{
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });
                if(res.data.success){
                    toast.success(res.data.message);
                }
                setIsLogin(true);
         }catch(error){
            toast.error(error.response.data.message);
            console.log(error);
         } finally{
            dispatch(setLoading(false));
        }
    }
         setFullName("");
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
                    !isLogin && <input value={fullName} onChange={(e)=>setFullName(e.target.value)} type='text' placeholder="fullname" />
                }
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder="email"/>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password'placeholder="password"/>
                <button className="login-button">
  {isLoading ? "Loading..." : (isLogin ? "Login" : "Sign up")}
</button>
                <p>{isLogin?  "New to Netflix?":"Already have an account?"}<span onClick={logininHandler}>{isLogin? "Signin":"Login"}</span></p>
            </div>
        </form>
	</div>
  );
}; 

export default Login;