import React from 'react';

const VideoCard = ({ video } : any) => {
  return (
    <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
        <img src={video.thumbnail} alt={video.title} style={{ width: '100%', height: 'auto' }} />
        <h3>{video.title}</h3>
      </div>
    </a>
  );
};

export default VideoCard;
