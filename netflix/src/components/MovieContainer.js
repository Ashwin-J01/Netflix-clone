import React from "react";
import MovieList from "./MovieList";
import './MovieContainer.css'
const MovieContainer = () => {
    return (
        <div className="movie-container">
            <div className="movie-container-inner">
                <MovieList />
            </div>
        </div>
    );
}
export default MovieContainer;