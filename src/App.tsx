import Message from './components/Message';
import Background from '../public/best-logo.png';

function App() {
  const backgroundImageStyle = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
  };

  const hoverMessage = {
    position: "absolute" as "absolute", // Specify the type as "absolute"
    bottom: "5%", /* Adjust the value to control the distance from the bottom */
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
  };

  return (
    <div style={backgroundImageStyle}>
      <div style={hoverMessage}>
        <Message />
      </div>
    </div>
  );
}

export default App;
