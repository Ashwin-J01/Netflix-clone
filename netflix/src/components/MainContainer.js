import React from "react";
import VideoTitle from "./VideoTitle";
import BackgroundVideo from "./BackgroundVideo";
import { useSelector } from "react-redux";
import './MainContainer.css';
const MainContainer = () => {
    const movie = useSelector((store) => store.movie?.nowPlayingMovie); 
    if(!movie) return;
    console.log(movie); 
    
    // Use a stable background video - only change on page refresh
    const backgroundIndex = 4; // You can change this to any number between 0-9
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