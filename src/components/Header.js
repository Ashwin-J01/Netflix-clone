import React from "react";
import './Header.css';
import image from "../logo.png"; // Assuming the logo is in the same directory
const Header = () => {
  return (
    <div className="header">
        <img className='' src={image} alt="logo"/>
        <div className="header-user">
            <h1>mern stack</h1>
            <div className="header-buttons">
            <button>logout</button>
            <button>search</button>
            </div>
        </div>
    </div>
  );
};

export default Header;