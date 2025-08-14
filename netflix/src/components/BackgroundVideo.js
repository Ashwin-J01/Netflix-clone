import React from 'react';
import './VideoBackGround.css';
import useBackgroundMovieById from '../hooks/useBackgroundMovieById';
import { useSelector } from 'react-redux';

const BackgroundVideo = ({movieId}) => {
    const backgroundTrailerMovie = useSelector(store=>store.movie.backgroundTrailerMovie);
    
    // Only call the background hook
    useBackgroundMovieById(movieId);
    
    if (!backgroundTrailerMovie?.key) {
        return (
            <div className="video-background">
                <div className="video-placeholder">
                    <p>No trailer available for this movie</p>
                </div>
            </div>
        );
    }

    return (
        <div className="video-background background-video">
            <iframe
                className="video-iframe"
                key={backgroundTrailerMovie.key}
                src={`https://www.youtube.com/embed/${backgroundTrailerMovie.key}?autoplay=1&mute=1&enablejsapi=1&controls=0&rel=0&loop=1&playlist=${backgroundTrailerMovie.key}&modestbranding=1&showinfo=0&iv_load_policy=3&vq=hd1080`}
                title="Background YouTube video player"
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
            <div className="video-overlay"></div>
        </div>
    );
};

export default BackgroundVideo;
