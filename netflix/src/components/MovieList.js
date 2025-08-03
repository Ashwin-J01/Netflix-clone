import React from "react";
import { MovieCard } from "./MovieCard";
import './MovieList.css'

const MovieList = () => {
    return (
        <div className="movie-list">
             <h1 className="movie-list-title">popularMovie</h1>
            <div className="movie-list-container">
                <div className="movie-list-inner">
                    <MovieCard/>
                    <MovieCard/>
                    <MovieCard/>
            
            </div>
            </div>
        </div>
    );
}
export default MovieList;

