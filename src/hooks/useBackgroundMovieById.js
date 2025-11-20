import axios from "axios";
import { options } from '../utils/constant';
import { useDispatch } from "react-redux";
import { getBackgroundTrailerMovies } from '../redux/movieSlice';
import { useEffect } from "react";

const useBackgroundMovieById = (movieId) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!movieId) return;
    
    const getMovieById = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, options);

        console.log('Background video:', res.data.results);
        const trailer = res?.data?.results?.filter((item) => {
          return item.type === "Trailer";
        })
        dispatch(getBackgroundTrailerMovies(trailer.length > 0 ? trailer[0] : res.data.results[0]));
      } catch (error) {
        console.log(error);
      }
    }
    getMovieById();
  }, [movieId, dispatch])

}

export default useBackgroundMovieById;
