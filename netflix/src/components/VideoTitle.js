import React from "react";
import "./VideoTitle.css"; // ✅ Link your plain CSS file

const VideoTitle = () => {
  return (
    <div className="video-title">
      <h1>Video Title Component</h1>
      <p>Description of the video goes here.</p>
      <div className="video-title-buttons">
        <button className="play-button">Play</button>
        <button className="info-button">Watch more</button>
      </div>
    </div>
  );
};

export default VideoTitle;
