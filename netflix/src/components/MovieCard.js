import React from 'react';
import './MovieCard.css';
import { TMDB_IMG_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { getId, setOpen } from '../redux/movieSlice';
const MovieCard = ({ posterPath,movieId }) => {
  const dispatch = useDispatch();
  if(posterPath=== null) return null; // Handle case where posterPath is null
  

  const handleOpen = () => {
    dispatch(getId(movieId)); // Dispatch action to set movieId
    dispatch(setOpen(true)); // Dispatch action to open the dialog
  };
  return (
    <div className="movie-card" onClick={handleOpen}>
      <img src={`${TMDB_IMG_URL}/${posterPath}`} alt="Movie Poster" />
    </div>
  );
};

export default MovieCard;
