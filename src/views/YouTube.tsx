import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import VideoCard from '../components/VideoCard';
import './loggedInViews.css'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

const YouTube = () => {
  const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     // Fetch videos from YouTube API
//     const fetchVideos = async () => {
//       const apiKey = 'YOUR_YOUTUBE_API_KEY'; // Replace with your API key
//       const channelId = 'YOUR_CHANNEL_ID'; // Replace with your channel ID
//       const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date`);
//       const data = await response.json();
//       setVideos(data.items);
//     };

//     fetchVideos();
//   }, []);

let navigate = useNavigate();
    const handleSecretClick = () => {
        navigate('/chatbot');
    };

  return (
    <div className='base-div'>
      <div className='navbar-div'>
        <NavBar />
      </div>
      <div className="centered-content">
      <button className="centered-button" onClick={handleSecretClick}>Try WallerGPT</button>
    </div>
    </div>
  );
};

export default YouTube;



{/* {videos.map(video => (
          <VideoCard key={video.id.videoId} video={{ title: video.snippet.title, thumbnail: video.snippet.thumbnails.high.url, id: video.id.videoId }} />
        ))} */}