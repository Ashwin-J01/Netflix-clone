import React from "react";
import "./VideoTitle.css"; // ✅ Link your plain CSS file

const VideoTitle = ({title,overview}) => {
  return (
    <div className="video-title">
      <h1>{title}</h1>
      <p>{overview}</p>
      <div className="video-title-buttons">
        <button className="play-button">Play</button>
        <button className="info-button">Watch more</button>
      </div>
    </div>
  );
};

export default VideoTitle;
