import React from "react";
import VideoTitle from "./VideoTitle";
import BackgroundVideo from "./BackgroundVideo";
import { useSelector } from "react-redux";
import './MainContainer.css';
const MainContainer = () => {
    const movie = useSelector((store) => store.movie?.nowPlayingMovie); 
    if(!movie) return;

    const backgroundIndex = 4;
    const{overview,id,title}= movie[backgroundIndex];   
    
    return (
        <div className="main-container">
            <BackgroundVideo movieId={id}/>
            <div className="content-overlay">
                <VideoTitle title={title} overview={overview}/>
            </div>
        </div>
    );
}
export default MainContainer;