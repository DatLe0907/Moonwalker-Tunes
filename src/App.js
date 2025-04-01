import "./normalize.css"
import './App.css';
import './assets/icon/Fontawesome.js'
import { BrowserRouter, Route, Routes , Navigate} from "react-router-dom";
import Footer from "./Footer/Footer.js";
import Navbar from "./Navbar/Navbar.js";
import Home from "./pages/Home/Home.js";
import Music from "./pages/Music/Music.js";
import Shop from "./pages/Shop/Shop.js";
import Game from "./pages/Game/Game.js";
import Tour from "./pages/Tour/Tour.js";
import { GameProvider } from './pages/context/PointsContext.js';
import { ToastProvider } from './pages/context/ToastContext.js';  


function App() {
  return (
    <ToastProvider>
      <GameProvider>
      <BrowserRouter basename='/Moonwalker-Tunes'>
        <Navbar/>
        <Routes>
          <Route path="*" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />}/>
          <Route path="/music" element={<Music />} />
          <Route path="/tour" element={<Tour />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/game" element={<Game />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </GameProvider>
    </ToastProvider>
    
  );
}

export default App;
