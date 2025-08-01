import React, { useEffect } from "react";
import Header from "./Header";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainContainer from "./MainContainer";
import MovieContainer from "./MovieContainer";
import axios from "axios";
import { Now_Playing_Movie, options } from "../utils/constant";
import { getNowPlayingMovies } from "../redux/movieSlice";
import UseNowPlayingMovies from "../hooks/useNowPlayingMovies";
const Browser = () => {
  const user= useSelector((store) => store.app.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // my custom hook to fetch now playing movies
  UseNowPlayingMovies();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });
  
  return (
    <div>
       <Header/>
       <div>
        <MainContainer/>
        <MovieContainer/>
       </div>
    </div>
  );
};

export default Browser;