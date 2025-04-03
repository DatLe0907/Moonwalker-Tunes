import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faYoutube, faSpotify } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
import { Link } from "react-router-dom";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="footer">
  <div className="footer-container">
    <Link to="/" className="logo">
      <h1>
        <span>Moonwalker</span>
        <FontAwesomeIcon icon={faCrown} />
        <span>Tunes</span>
      </h1>
    </Link>
    <div className="footer-contact">
      Contact us: <a className="contact-email" href="mailto:moonwalkertunes@gmail.com?subject=Inquiry&body=Hello,%20I%20have%20a%20question%20about...">moonwalkertunes@gmail.com</a>
      <br/>
      Location: 123 Moonwalker Lane, Neverland, USA
      <br/>
      <div className="footer-icons">
      Social Media:
        <a href="https://www.facebook.com/michaeljackson" target="_blank" rel="noopener noreferrer" className="footer-link facebook">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://www.youtube.com/user/michaeljackson" target="_blank" rel="noopener noreferrer" className="footer-link youtube">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
        <a href="https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm" target="_blank" rel="noopener noreferrer" className="footer-link spotify">
          <FontAwesomeIcon icon={faSpotify} />
        </a>
      </div>
    </div>
  </div>
  <div className="footer-text">
    <p>&copy; {new Date().getFullYear()} Moonwalker Tunes</p>
    <p className="footer-info">Created with ❤️ by Datle</p>
  </div>
  
</footer>
  );
}
