import React from 'react';
import './VideoBackGround.css';
import useMovieById from '../hooks/useMovieById';
import { useSelector, useDispatch } from 'react-redux';
import { setFullScreen } from '../redux/movieSlice';
import { FaExpand, FaCompress} from 'react-icons/fa';

const VideoBackground = ({movieId}) => {
    const trailerMovie = useSelector(store=>store.movie.trailerMovie);
    const isFullScreen = useSelector(store=>store.movie.isFullScreen);
    const dispatch = useDispatch();
    
    // Only call the dialog hook since this is only for dialog videos
    useMovieById(movieId);

    const handleFullScreenToggle = () => {
        dispatch(setFullScreen(!isFullScreen));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Escape' && isFullScreen) {
            dispatch(setFullScreen(false));
        }
    };

    React.useEffect(() => {
        if (isFullScreen) {
            document.addEventListener('keydown', handleKeyPress);
            return () => document.removeEventListener('keydown', handleKeyPress);
        }
    }, [isFullScreen]);

    // Debug logging
    console.log('VideoBackground (Dialog) render:', {
      movieId,
      trailerMovie: trailerMovie?.key
    });
    
    if (!trailerMovie?.key) {
        return (
            <div className="video-background">
                <div className="video-placeholder">
                    <p>No trailer available for this movie</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`video-background dialog-video ${isFullScreen ? 'fullscreen' : ''}`}>
            <iframe
                className="video-iframe"
                key={trailerMovie?.key || movieId} // Add key to force re-render when movie changes
                src={`https://www.youtube.com/embed/${trailerMovie.key}?autoplay=1&mute=1&enablejsapi=1&controls=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
            
            <div className="video-controls">
                <button 
                    className="control-btn fullscreen-btn"
                    onClick={handleFullScreenToggle}
                    title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                >
                    {isFullScreen ? <FaCompress /> : <FaExpand />}
                </button>
            </div>
        </div>
    );
};

export default VideoBackground;
