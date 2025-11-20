import React from 'react';
import './MovieCard.css';
import { TMDB_IMG_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { getId, setOpen } from '../redux/movieSlice';
import SubscriptionModal from './SubscriptionModal';
const MovieCard = ({ posterPath,movieId, isNowPlaying=false }) => {
  const dispatch = useDispatch();
  const { isSubscribed } = useSelector(store => store.app);
  const [showPaywall, setShowPaywall] = React.useState(false);
  const nowPlayingIds = useSelector(store => store.movie.nowPlayingMovie)?.map(m => m.id) || [];
  if(posterPath=== null) return null; // Handle case where posterPath is null
  

  const handleOpen = () => {
    const gateNowPlaying = isNowPlaying && nowPlayingIds.includes(movieId);
    if (gateNowPlaying && !isSubscribed) {
      setShowPaywall(true);
      return;
    }
    dispatch(getId(movieId));
    dispatch(setOpen(true));
  };
  return (
    <>
      <div className="movie-card" onClick={handleOpen}>
        <img src={`${TMDB_IMG_URL}/${posterPath}`} alt="Movie Poster" />
      </div>
      <SubscriptionModal
        open={showPaywall}
        onClose={() => setShowPaywall(false)}
        onSuccess={() => {
          dispatch(getId(movieId));
          dispatch(setOpen(true));
        }}
      />
    </>
  );
};

export default MovieCard;
