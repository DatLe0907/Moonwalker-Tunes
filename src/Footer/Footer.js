import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faYoutube, faSpotify } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">&copy; {new Date().getFullYear()} Moonwalker Tunes</p>
        <div className="footer-icons">
          <a
            href="https://www.facebook.com/michaeljackson"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link facebook"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href="https://www.youtube.com/user/michaeljackson"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link youtube"
          >
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a
            href="https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link spotify"
          >
            <FontAwesomeIcon icon={faSpotify} />
          </a>
        </div>
      </div>
    </footer>
  );
}
