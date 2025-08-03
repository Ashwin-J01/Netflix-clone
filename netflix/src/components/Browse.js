import React, { useEffect } from "react";
import Header from "./Header";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainContainer from "./MainContainer";
import MovieContainer from "./MovieContainer";
import UseNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import UseTopRatedMovies from "../hooks/useTopRatedMovies";
import UseUpcomingMovies from "../hooks/useUpcomingMovies";

const Browser = () => {
  const user= useSelector((store) => store.app.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // my custom hook to fetch now playing movies
  UseNowPlayingMovies();
  usePopularMovies();
  UseTopRatedMovies();
  UseUpcomingMovies();

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