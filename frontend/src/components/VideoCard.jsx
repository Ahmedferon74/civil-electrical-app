import React from 'react';
import '../styles/VideoCard.css'; // لو حبيت تعمل تنسيق خارجي

const VideoCard = ({ title, description, videoUrl }) => {
  return (
    <div className="video-card">
      <div className="video-wrapper">
        <iframe
          src={videoUrl}
          title={title}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <h3 className="video-title">{title}</h3>
      <p className="video-description">{description}</p>
    </div>
  );
};

export default VideoCard;
