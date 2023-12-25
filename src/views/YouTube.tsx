import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import './loggedInViews.css'

interface YouTubeVideo {
    id: {
        kind: string;
        videoId?: string;
        channelId?: string;
        playlistId?: string;
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
    const [containerHeight, setContainerHeight] = useState(window.innerHeight - 80);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isMobile = windowWidth < 600;

    useEffect(() => {
        const handleResize = () => {
            setContainerHeight(window.innerHeight - 80);
            setWindowWidth(window.innerWidth);
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
            // Assuming response.data is an array as shown in your API response example
            const videoItems = response.data.filter((item: YouTubeVideo) => item.id.kind === "youtube#video");
            setVideos(videoItems);
        } catch (error) {
            console.error('Error fetching videos', error);
        }
    };
    

    const truncateTitle = (description: any) => {
        const maxChar = isMobile ? 50 : 150; // Set your character limit
        return description.length > maxChar ? description.substring(0, maxChar) + '...' : description;
    };


    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh',}}>
            <div className="moving-background"></div> 
            <div className='navbar-div'> {/*This is 80px*/}
                <NavBar title="Anding Analytics" /> 
            </div>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                width: '100%',
                maxHeight: `${containerHeight}px`,
                // backgroundColor: '#343541',
                marginTop: '80px',
            }}>
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'flex-start', 
                    alignItems: 'center', 
                    width: isMobile ? '95%' : '50%',
                    maxHeight: `${containerHeight}px`,
                    overflowY: 'scroll',
                }}>
                    {videos.map((video, index) => (
                        <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer" 
                           style={{ 
                               textDecoration: 'none', 
                               color: 'inherit', 
                               width: '95%', 
                               marginBottom: index === videos.length - 1 ? '0' : '20px' // Add margin to all but the last element
                           }} 
                           key={video.id.videoId}>
                            <div style={{ 
                                display: 'flex', 
                                flexDirection: 'row', 
                                justifyContent: 'flex-start', 
                                alignItems: 'center',
                                width: '100%', 
                                border: '1px solid transparent',
                                borderRadius: '10px',
                                transition: 'all 0.3s ease-in-out',
                                boxShadow: 'none'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.border = '1px solid white';
                                e.currentTarget.style.boxShadow = '0 0 10px white';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.border = '1px solid transparent';
                                e.currentTarget.style.boxShadow = 'none';
                            }}>
                                <img style={{height: '100px', marginLeft: '10px'}} src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                                <div style={{ marginLeft: '15px' }}>
                                    {isMobile ? <h4>{truncateTitle(video.snippet.title)}</h4> : <h3>{truncateTitle(video.snippet.title)}</h3>}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default YouTube;
