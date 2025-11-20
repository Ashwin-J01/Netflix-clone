import React from "react";
import './Header.css';
import { useSelector,useDispatch } from "react-redux";
import image from "../logo.png"; // Assuming the logo is in the same directory
import { API_END_POINT } from "../utils/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import { setToggle } from "../redux/movieSlice";

const Header = () => {
  const user = useSelector((store)=> store.app.user);
  const dispatch = useDispatch();
  const toggle = useSelector((store=>store.movie.toggle));;
  const navigate = useNavigate();
  const logoutHandler = async()=>{
    try{
       const res = await axios.get(`${API_END_POINT}/logout`);
       if(res.data.success){
          toast.success(res.data.message);
      }
       dispatch(setUser(null));
       navigate("/");
    }
    catch(error){
      console.log(error);
    }
  }
  const toggleHandler = () => {
      dispatch(setToggle());
  }
  return (
    <div className="header">
        <img className='' src={image} alt="logo"/>
        { 
        user&& (
        <div className="header-user">
            <h1>{user.fullName}</h1>
            <div className="header-buttons">
            <button onClick={toggleHandler}>{toggle?"Home":"search"}</button>
            <button onClick={logoutHandler}>logout</button>
            
            </div>
        </div>)
  }
    </div>
  );
};

export default Header;