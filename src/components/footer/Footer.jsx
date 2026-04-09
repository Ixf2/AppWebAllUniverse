import "./Footer.css";
import { FaYoutube, FaFacebookF, FaTwitter, FaTwitch, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  <>
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>AllUniverse</h3>
            <p>© 2026 AllUniverse. All rights reserved.</p>
            <div className="footer-links">
              <a href="https://www.youtube.com/watch?v=m3kR2KK8TEs" target="_black" rel="noopener noreferrer"><FaYoutube /></a>
              <a href="https://www.facebook.com/NASA/?locale=es_LA" target="_black" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://x.com/NASA" target="_black" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://www.twitch.tv/nasa" target="_black" rel="noopener noreferrer"><FaTwitch /></a>
              <a href="https://www.twitch.tv/nasa" target="_black" rel="noopener noreferrer"><FaGithub /></a>
              <a href="https://github.com/Ixf2" target="_black" rel="noopener noreferrer"><FaGithub /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Navegation</h4>
            <a href="" target="_black" rel="noopener noreferrer">FIGMA</a>
            <a href="/home">Home</a>
            <a href="/artemisII">Artemis II</a>
            <a href="/elements">Elements</a>
            <a href="/legal">Legal and Terms</a>
          </div>

        <div className="footer-bottom">
          <p></p>
        </div>
      </div>
      </div>
    </footer>
  </>

}