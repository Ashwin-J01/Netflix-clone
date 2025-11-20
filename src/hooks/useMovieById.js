import axios from "axios";
import { options } from '../utils/constant';
import { useDispatch } from "react-redux";
import { getTrailerMovies } from '../redux/movieSlice';
import { useEffect } from "react";


const useMovieById = (movieId) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!movieId) return;
    
    const getMovieById = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, options);

        console.log('Dialog video:', res.data.results);
        const trailer = res?.data?.results?.filter((item) => {
          return item.type === "Trailer";
        })
        dispatch(getTrailerMovies(trailer.length > 0 ? trailer[0] : res.data.results[0]));
      } catch (error) {
        console.log(error);
      }
    }
    getMovieById();
  }, [movieId, dispatch])

}

export default useMovieById;