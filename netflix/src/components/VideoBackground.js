import React from 'react';
import './VideoBackGround.css';

const VideoBackground = (bool) => {

  return (
    <div className="video-background">
      <iframe 
       className={bool ? "full" : "screen"}
    src="https://www.youtube.com/embed/nb_fFj_0rq8?si=3x0-d5ZbzDLWrERG&autoplay=1&mute=1" 
      title="YouTube video player" 
      frameborder="0"
       allowFullScreen>
       </iframe>
    </div>
  );
};

export default VideoBackground;
