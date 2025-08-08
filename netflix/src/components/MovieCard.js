import React from 'react';
import './MovieCard.css';
import { TMDB_IMG_URL } from '../utils/constant';

const MovieCard = ({ posterPath }) => {
  if(posterPath=== null) return null; // Handle case where posterPath is null
  return (
    <div className="movie-card">
      <img src={`${TMDB_IMG_URL}/${posterPath}`} alt="Movie Poster" />
    </div>
  );
};

export default MovieCard;
