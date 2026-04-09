import "./Footer.css";
import {
  FaYoutube,
  FaFacebookF,
  FaTwitter,
  FaTwitch,
  FaGithub,
  FaRocket,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-overlay"></div>

      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <h3>
              <FaRocket className="brand-icon" />
              AllUniverse
            </h3>
            <p>
              Explore Artemis II, planets, elements and the mysteries of the
              universe through an immersive digital experience.
            </p>

            <div className="footer-links social-links">
              <a
                href="https://www.youtube.com/watch?v=m3kR2KK8TEs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>

              <a
                href="https://www.facebook.com/NASA/?locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://x.com/NASA"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>

              <a
                href="https://www.twitch.tv/nasa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitch"
              >
                <FaTwitch />
              </a>

              <a
                href="https://github.com/Ixf2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Navigation</h4>
            <Link to="/home">Home</Link>
            <Link to="/artemisII">Artemis II</Link>
            <Link to="/elements">Elements</Link>
            <Link to="/legal">Legal and Terms</Link>
            <a
              href="https://www.figma.com/design/xlkFNEcoQXmrIBsRgxbjTj/AppWebAllUniverse?node-id=0-1&m=dev&t=6OJ86lnrmOukx51v-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Figma
            </a>
          </div>

          <div className="footer-section">
            <h4>Mission</h4>
            <p>Artemis II inspired interface.</p>
            <p>Planetary exploration content.</p>
            <p>Interactive universe resources.</p>
            <p>Space-themed educational project.</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 AllUniverse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;