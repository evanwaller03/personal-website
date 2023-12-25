import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';

const Achievement = ({ company, title, description, location, date, url } : any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 600;

  useEffect(() => {
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);


  const achievementStyle: React.CSSProperties = {
    borderRadius: '5px',
    boxShadow: '0 5px 5px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    cursor: 'pointer',
    backgroundColor: '#57596d',
    border: isHovered ? '1px solid #ffffff' : '1px solid transparent',
    transition: 'border 0.3s, box-shadow 0.3s',
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', width: isMobile ? '90%' : '75%', marginBottom: '10px' }}>
      <div
        style={achievementStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: isMobile ? '50%' : '75%'}}>
                <h3 style={{ color: '#ffffff', paddingLeft: '10px', paddingRight: '10px', fontSize: '1.2em' }}>{company}</h3>
                <h4 style={{ color: '#ffffff', paddingLeft: '10px', paddingRight: '10px' }}>{title}</h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: isMobile ? '50%' : '25%'}}>
                <h4 style={{ color: '#ffffff', textAlign: 'right', paddingLeft: '10px', paddingRight: '10px' }}>{location}</h4>
                <h4 style={{ color: '#ffffff', textAlign: 'right', paddingLeft: '10px', paddingRight: '10px' }}>{date}</h4>
            </div>
          
        </div>
        <p style={{ color: '#ffffff', paddingLeft: '10px', paddingRight: '10px'}}>{description}</p>
      </div>
    </a>
  );
};

const Resume = () => {
    const pageStyle: React.CSSProperties = {
        position: 'relative',
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: '90px', // Adjust this value to match the NavBar height
        width: "100%",
        overflow: 'auto',
        minHeight: '100vh', // Ensures that the container is at least as tall as the viewport
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'auto'}}>
            <div className='moving-background'></div>
            <div className='navbar-div'>
                <NavBar title='Resume'/>
            </div>
            <div style={pageStyle}>
                <Achievement 
                    company="KPMG"
                    title="Business Valuation Associate"
                    description="Actively developing my skills in providing valuation services to a variety of private and public clients across multiple industries. My focus is on gaining expertise in intangible asset valuation for financial reporting and tax purposes, including areas such as business combinations (ASC 805), impairment testing (ASC 350), and broadening my understanding of business enterprise and equity valuations."
                    location="Chicago, IL"
                    date="July 2023 - Present"
                    url='https://kpmg.com/us/en/capabilities-services/tax-services/mergers-acquisitions-tax-and-valuations/valuations.html'
                />
                <Achievement 
                    company="University of Illinois - Gies College of Business"
                    title="Degree: Bachelor of Science in Finance"
                    description="Gies Scholar, James Scholar"
                    location="Champaign, IL"
                    date="August 2019 - May 2023"
                    url='https://giesbusiness.illinois.edu/'
                />
                <Achievement 
                    company="Galleon LLC"
                    title="Co-Owner"
                    description="Developed and launched my inaugural iOS and Android mobile application, honing skills in all phases of app development - from initial ideation to market release. This project showcased my ability to transform a concept into a fully-functional mobile app."
                    location="Champaign, IL"
                    date="October 2021 - June 2023"
                    url="https://evanwaller.com/mycode"
                />
                <Achievement 
                    company="KPMG"
                    title="Business Valuation Internship"
                    description="Post-Junior-Year Summer 2022 Internship"
                    location="Chicago, IL"
                    date="June 2022 - August 2022"
                    url='https://kpmg.com/us/en/capabilities-services/tax-services/mergers-acquisitions-tax-and-valuations/valuations.html'
                />
                <Achievement 
                    company="Vermillion Financial Advisors"
                    title="Financial Advising Intern"
                    description="Gained comprehensive knowledge in the seven key facets of financial advising and developing versatility in various business roles, enhancing both my financial acumen and adaptability in a dynamic professional environment."
                    location="Barrington, IL"
                    date="June 2021 - August 2021"
                    url="https://www.vermillionfinancial.com/about-us/advisors/"
                />
                <Achievement 
                    company="Lake Forest Casket"
                    title="Casket Technician"
                    description="Managed and processed international shipments of caskets, ensuring efficient and accurate preparation for delivery across the Chicago-land area."
                    location="Villa Park, IL"
                    date="June 2020 - August 2020"
                    url='https://lakeforestcasket.com/about-us/'
                />
                <Achievement 
                    company="Students 4 Hire"
                    title="Co-Owner"
                    description="Co-founded a landscaping business during the peak of COVID-19, adapting to market needs and providing essential outdoor maintenance services, demonstrating entrepreneurship and resilience in a challenging economic climate."
                    location="Palatine, IL"
                    date="May 2020 - August 2020"
                />
            </div>
        </div>
    );
};

export default Resume;
