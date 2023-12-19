import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';

interface YouTubeVideo {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        thumbnails: {
            default: {
                url: string;
            };
            // ... other thumbnail sizes if needed
        };
        // ... other properties you might need
    };
}

interface YouTubeApiResponse {
    items: YouTubeVideo[];
    // ... other properties of the response
}

const YouTube = () => {
    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [containerHeight, setContainerHeight] = useState(window.innerHeight - 60);


    useEffect(() => {
        const handleResize = () => {
            setContainerHeight(window.innerHeight - 60);
        };

        window.addEventListener('resize', handleResize);

        // Fetch videos on component mount
        fetchVideos();

        // Cleanup event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const fetchVideos = async () => {
        try {
            const response = await axios.get('https://api.evanwaller.com/youtube');
            // http://127.0.0.1:8000/youtube
            setVideos(response.data);
        } catch (error) {
            console.error('Error fetching videos', error);
        }
    };

    return (
        <div className='under-div' style={{ position: 'relative' }}>
            <div className='navbar-div'>
                <NavBar title="Anding Analytics" />
            </div>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'flex-start', 
                alignItems: 'flex-start', 
                width: '100%',
                maxHeight: `${containerHeight}px`,
                overflowY: 'scroll' // Enable vertical scrolling
            }}>
                {videos.map(video => (
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'row', 
                        justifyContent: 'flex-start', 
                        alignItems: 'center', 
                        margin: '15px 15%', 
                        width: '70%' 
                    }} key={video.id.videoId}>
                        <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                        <h3 style={{ marginLeft: '15px' }}>{video.snippet.title}</h3>
                        {/* Additional video details and analytics can be added here */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default YouTube;
