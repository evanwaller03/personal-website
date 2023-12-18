import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatBot from './views/ChatBot';
import Home from './views/Home'; // Assuming you have a Home component
import UnderConstruction from './views/UnderConstruction';
import YouTube from './views/YouTube';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/youtube" element={<YouTube />}/>
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/" element={<UnderConstruction />} />
      </Routes>
    </Router>
  );
}

export default App;