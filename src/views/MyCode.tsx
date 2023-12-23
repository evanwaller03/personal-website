import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import './loggedInViews.css'

type GitHubRepo = {
    id: number;
    name: string;
    html_url: string;
    description: string;
    language: string;
    languages_url: string; // URL to fetch languages
    languages: string[]; // Add this line
};




const MyCode = () => {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [containerHeight, setContainerHeight] = useState(window.innerHeight - 80);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isMobile = windowWidth < 600;
    const pageStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%", // This makes the inner container take up 100% of the parent's height
        width: "100%",
        paddingTop: '25px'
    };

    const sectionStyle: React.CSSProperties  = {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: isMobile ? '100%' : '100%',
        margin: '0 auto', // Center the section
        marginBottom: '15px'
      };
    
      const imageStyle: React.CSSProperties  = {
        width: isMobile ? '95%' : '45%',
        objectFit: 'cover', // This ensures that the images are sized properly without being stretched
        marginBottom: isMobile ? '20px' : '0', // Add margin at the bottom on mobile
      };
    
      const titleStyle: React.CSSProperties  = {
        color: '#FFFFFF', // White letters as specified
        textAlign: 'center',
        width: '100%',
        marginBottom: '20px', // Space between title and images
        fontSize: isMobile ? '1.5em' : '2em',
      };

    useEffect(() => {
        const handleResize = () => {
            setContainerHeight(window.innerHeight - 80);
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        // Replace 'your-username' with your actual GitHub username
        fetch('https://api.github.com/users/evanwaller03/repos')
        .then(response => response.json())
        .then((data: GitHubRepo[]) => Promise.all(data.map(repo => 
            fetch(repo.languages_url)
                .then(res => res.json())
                .then(languages => ({
                    ...repo,
                    languages: Object.keys(languages) // Get all language names
                }))
        )))
        .then(reposWithLanguages => setRepos(reposWithLanguages as GitHubRepo[]))
        .catch(error => console.error(error));

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', }}>
            <div className="moving-background"></div> 
             <div className='navbar-div'>
                <NavBar title='My Code'/>
            </div>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'flex-start', 
                alignItems: 'center', 
                width: '100%',
                minHeight: `${containerHeight}px`,
                overflowY: 'scroll',
            }}>
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'flex-start', 
                    alignItems: 'center', 
                    width: isMobile ? '90%' : '50%',
                    minHeight: `${containerHeight}px`,
                    overflowY: 'scroll',
                }}>
                    <ul>
                        {repos.map(repo => (
                            <li key={repo.id} 
                            style={{ 
                                display: 'flex', 
                                flexDirection: 'column', // Changed from row to column for better control over title and description
                                justifyContent: 'flex-start', 
                                alignItems: 'flex-start', // Changed from center to flex-start to align text to the left
                                width: '95%', 
                                border: '1px solid transparent',
                                borderRadius: '10px',
                                transition: 'all 0.3s ease-in-out',
                                boxShadow: 'none',
                                marginBottom: '20px',
                                padding: '5px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.border = '1px solid white';
                                e.currentTarget.style.boxShadow = '0 0 10px white';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.border = '1px solid transparent';
                                e.currentTarget.style.boxShadow = 'none';
                            }}>
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <span style={{ fontWeight: 'bold', fontSize: '1.4em', display: 'block', textDecoration: 'underline'}}>{repo.name}</span>
                                    <span style={{ fontSize: '1em', display: 'block' }}>{repo.description}</span>
                                    {repo.languages && <span style={{ fontSize: '.8em', display: 'block', marginTop: '5px' }}>
                                        Languages: {repo.languages.join(', ')}
                                    </span>}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <h1 style={titleStyle}>My first app: <span style={{ color: '#22bcf3' }}>Galleon</span></h1>
                    <div style={sectionStyle}>
                        <img src="/galleon-login.jpeg" alt="Galleon Login Screen" style={imageStyle} />
                        <img style={{marginLeft: isMobile ? '0px' : '10px', width: isMobile ? '95%' : '45%', objectFit: 'cover', marginBottom: isMobile ? '20px' : '0', }} src="/galleon-leaderboard.jpeg" alt="Galleon Leader Board" />
                    </div>
                    <h1 style={titleStyle}>We tested <span style={{ color: '#22bcf3' }}>multiple versions</span></h1>
                    <div style={sectionStyle}>
                        <img src="/galleon-home-1.jpeg" alt="Galleon Home Screen Variation 1" style={imageStyle} />
                        <img style={{marginLeft: isMobile ? '0px' : '10px', width: isMobile ? '95%' : '45%', objectFit: 'cover', marginBottom: isMobile ? '20px' : '0', }} src="/galleon-home-2.jpeg" alt="Galleon Home Screen Variation 2" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCode;
