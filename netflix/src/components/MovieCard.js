import React from 'react'
import './MovieCard.css'
import { TMDB_IMG_URL } from '../utils/constant';
export const MovieCard = ({posterPath}) => {
  return (
     <div className="movie-card" >
        <img src={`${TMDB_IMG_URL}/${posterPath}`} alt="Movie Poster" />
        </div>
  );
}
export default MovieCard;
