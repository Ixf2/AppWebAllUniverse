import { useRef, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import videoNotFound from "../../data/video/notfound.mp4";
import "./NotFound.css";

export default function NotFound() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6; 
    }
  }, []);

  return (
    <div className="notfound-layout">
      <Header />
      <main className="notfound-page">
        <video
          ref={videoRef}
          className="notfound-video"
          src={videoNotFound}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />

        <div className="notfound-overlay"></div>

        <div className="notfound-ui">
          <div className="notfound-content">
            <h1 className="notfound-title">ERROR 404</h1>
            <p className="notfound-text">PAGE NOT FOUND</p>

            <Link to="/" className="notfound-button">
              RETURN TO EARTH
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}