import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCrown } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useGame } from "../pages/context/PointsContext"; 
import "./Navbar.css";
import "./Navbar-responsive.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { points } = useGame(); 
  const location = useLocation(); // Lấy đường dẫn hiện tại

  // Xử lý đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn về đầu trang
  }, [location.pathname]);

  return (
    <nav>
      <div id="title">
        <Link to="/" className="logo">
          <h1>
            <span>Moonwalker</span>
            <FontAwesomeIcon icon={faCrown} />
            <span>Tunes</span>
          </h1>
        </Link>

        <div className="points">
          Tokens: <b>{points}</b>
        </div>
      </div>

      <i className="menu-bar" onClick={() => setMenuOpen(!menuOpen)}>
        <FontAwesomeIcon icon={faBars} />
      </i>

      {/* Gán ref vào menu */}
      <div ref={menuRef} className={`menu ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)}>
        <div className={`home ${location.pathname === "/home" ? "active" : ""}`}>
          <Link to="/">Home</Link>
        </div>
        <div className={`music ${location.pathname === "/music" ? "active" : ""}`}>
          <Link to="/music">Music</Link>
        </div>
        <div className={`tour ${location.pathname === "/tour" ? "active" : ""}`}>
          <Link to="/tour">Tour</Link>
        </div>
        <div className={`shop ${location.pathname === "/shop" ? "active" : ""}`}>
          <Link to="/shop">Shop</Link>
        </div>
        <div className={`game ${location.pathname === "/game" ? "active" : ""}`}>
          <Link to="/game">Game</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
