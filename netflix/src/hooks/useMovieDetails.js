import { useState, useEffect } from 'react';
import axios from 'axios';
import { options } from '../utils/constant';

const useMovieDetails = (movieId) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [detailsRes, relatedRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, options),
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar`, options)
        ]);
        
        setMovieDetails(detailsRes.data);
        setRelatedMovies(relatedRes.data.results.slice(0, 6));
      } catch (err) {
        setError('Failed to load movie details');
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return { movieDetails, relatedMovies, loading, error };
};

export default useMovieDetails;
