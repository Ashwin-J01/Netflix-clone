import React from "react";
import MovieCard from "./MovieCard";

import './MovieList.css'

const MovieList = ({title,movies,searchMovie=false}) => {
if (!movies || !Array.isArray(movies) || movies.length === 0) return null;
console.log(movies);
    return (
        <div className="movie-list">
             <h1 className="movie-list-title">{title}</h1>
            <div className="movie-list-container">
                <div className="movie-list-inner">
                    {
                        movies?.map((movie) => {
                            return (
                                <MovieCard key={movie.id} posterPath={movie.poster_path}/>
                            );
                        })
                    }
            </div>
            </div>
        </div>
    );
}
export default MovieList;

