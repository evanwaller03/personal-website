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

    const sectionStyle: React.CSSProperties  = {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: isMobile ? '100%' : '100%',
        margin: '0 auto', // Center the section
        marginBottom: '15px'
      };
    
      const imageStyle: React.CSSProperties = {
        width: isMobile ? '100%' : '98%',
        objectFit: 'cover',
        marginBottom: '20px',
      };
    
      const titleStyle: React.CSSProperties = {
        color: '#FFFFFF',
        textAlign: 'center',
        width: '100%',
        fontSize: isMobile ? '1.5em' : '2em',
      };

      const descriptionStyle: React.CSSProperties = {
        color: '#FFFFFF',
        textAlign: 'center',
        width: '95%',
        marginBottom: '20px',
        fontSize: isMobile ? '1.3em' : '1.7em',
      };

      const imageContainerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: isMobile ? '90%' : '100%',
        
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
                    <h1 style={titleStyle}>Check out my <span style={{ color: '#22bcf3' }}>Github</span></h1>
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
                    <div className="soft-grey-line"></div> 
                    <h1 style={titleStyle}>My first iOS & Android app: <span style={{ color: '#22bcf3', fontSize: '1.4em'}}>Galleon</span></h1>
                    <div style={imageContainerStyle}>
                        <div>
                            <p style={descriptionStyle}>The Login Screen</p>
                            <img src="/galleon-login.jpeg" alt="Galleon Login Screen" style={imageStyle} />
                        </div>
                        <div>
                            <p style={descriptionStyle}>Social Leader Board</p>
                            <img src="/galleon-leaderboard.jpeg" alt="Galleon Leader Board" style={imageStyle} />
                        </div>
                    </div>
                    <h1 style={titleStyle}>We tested <span style={{ color: '#22bcf3' }}>multiple versions</span></h1>
                    <div style={imageContainerStyle}>
                        <div>
                            <p style={descriptionStyle}>Home Page Variation</p>
                            <img src="/galleon-home-1.jpeg" alt="Galleon Home Screen Variation 1" style={imageStyle} />
                        </div>
                        <div>
                            <p style={descriptionStyle}>Version On Launch</p>
                            <img src="/galleon-home-2.jpeg" alt="Galleon Home Screen Variation 2" style={imageStyle}/>
                        </div>
                    </div>
                    <div style={sectionStyle}>
                        
                        
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default MyCode;
