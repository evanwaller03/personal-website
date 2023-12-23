import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';

type GitHubRepo = {
    id: number;
    name: string;
    html_url: string;
    description: string;
    language: string;
    languages_url: string; // URL to fetch languages
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
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden'}}>
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
                backgroundColor: '#343541',
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
                                    <span style={{ fontSize: '.8em', display: 'block', marginTop: '5px' }}>
                                        Languages: {repo.languages_url.join(', ')}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MyCode;
