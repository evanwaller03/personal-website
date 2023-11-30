import React, { useEffect, useState } from 'react';

function CountdownTimer() {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  const largeText: React.CSSProperties = {
    fontSize:"3em",  // Stack elements vertically
    paddingRight:"5px",
  };
  const smallText: React.CSSProperties = {
    fontSize:"1em",  // Stack elements vertically

  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function calculateTimeRemaining() {
    // Calculate the time remaining from the user's login time to December 2nd at 12:00 AM
    const now = new Date();
    const december2nd = new Date(now.getFullYear(), 11, 9, 0, 0, 0, 0); // December is 11 (0-indexed)

    const timeDifference = december2nd.getTime() - now.getTime();

    if (timeDifference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }
  const messageStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center", // Horizontal centering
    alignItems: "center",     // Vertical centering
    height: "20%",          // Set the container height to 100% of the viewport height
    flexDirection: "column",  // Stack elements vertically
  };

  
  return (
    <div>
        <div style={messageStyle}>
      <div>
       
            <span style={largeText}>
                {timeRemaining.days}
            </span>
            <span style={smallText}>
                days:
            </span>
            <span style={largeText}>
                {timeRemaining.hours}
            </span>
            <span style={smallText}>
                hrs:
            </span>
            <span style={largeText}>
                {timeRemaining.minutes}
            </span>
            <span style={smallText}>
                min:
            </span>
            <span style={largeText}>
                {timeRemaining.seconds}
            </span>
            <span style={smallText}>
                sec
            </span>
      </div>
      </div>
    </div>
  );
}

export default CountdownTimer;
