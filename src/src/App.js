import './App.css';
import './assets/icon/Fontawesome.js'
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Footer from "./Footer/Footer.js";
import Navbar from "./Navbar/Navbar.js";
import Home from "./pages/Home/Home.js";
import Music from "./pages/Music/Music.js";
import Shop from "./pages/Shop/Shop.js";
import Game from "./pages/Game/Game.js";


function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<Home />}/>
          <Route path="/music" element={<Music />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/game" element={<Game />} />
        </Routes>
        <Footer/>
      </Router>
  );
}

export default App;
