import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatBot from './views/ChatBot';
import YouTube from './views/YouTube';
import Home from './views/Home'; // Assuming you have a Home component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/youtube" element={<YouTube />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;