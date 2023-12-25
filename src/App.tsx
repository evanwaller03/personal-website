import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WallerGPT from './views/WallerGPT';
import GalaxyInvaders from './views/GalaxyInvaders'; // Assuming you have a Home component
import UnderConstruction from './views/UnderConstruction';
import YouTube from './views/YouTube';
import Welcome from './views/Welcome';
import Resume from './views/Resume';
import MyCode from './views/MyCode';
import Quotes from './views/Quotes';
import Interests from './views/Interests';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<UnderConstruction />} /> */}
        <Route path="/" element={<Welcome />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/mycode" element={<MyCode />} />
        <Route path="/youtube" element={<YouTube />}/>
        {/* <Route path="/galaxyinvaders" element={<GalaxyInvaders />} /> */}
        <Route path="/wallergpt" element={<WallerGPT />} />
        {/* <Route path="/quotes" element={<Quotes />} />
        <Route path="/interests" element={<Interests />} /> */}
      </Routes>
    </Router>
  );
}

export default App;