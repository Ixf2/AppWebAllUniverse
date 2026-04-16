import { useRef, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import videoTermsLegal from "../../data/video/terms-and-legal.mp4";
import "./Terms.css";
import LoadingScreen from "../../components/loadingscreen/LoadingScreen";

export default function Terms() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  return (
    <>
      <Header />
      <LoadingScreen isDataLoaded={true} />

      <div className="terms-layout">
        <main className="terms-page">
          <video
            ref={videoRef}
            className="legal-video"
            src={videoTermsLegal}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />

          <div className="terms-overlay"></div>

          <div className="terms-ui">
            <div className="terms-content-box">
              <div className="terms-text-container">
                <h1>Terms and Conditions</h1>
                <p>
                  Welcome to AppWebAllUniverse. By accessing or using this
                  website, you agree to be bound by these Terms and Conditions.
                  All content, including text, images, videos, and data related
                  to planets, stars, and other celestial objects, is provided
                  for educational and informational purposes only and may not be
                  copied, reproduced, or distributed without prior permission.
                  All materials, including design and media, are the
                  intellectual property of AppWebAllUniverse unless otherwise
                  stated. While we strive to provide accurate and up-to-date
                  information, we do not guarantee the completeness or
                  reliability of the content, and scientific data may evolve
                  over time. Some visual representations may be artistic or
                  simulated and may not reflect real-time appearances. Users
                  agree not to use the website for illegal purposes, attempt
                  unauthorized access, or disrupt its functionality. This
                  website may include links to third-party sites, for which we
                  are not responsible. AppWebAllUniverse shall not be liable for
                  any damages arising from the use of this website, and all
                  content is provided "as is" without warranties. We reserve the
                  right to modify these Terms at any time, and continued use of
                  the site implies acceptance of any changes. For questions,
                  please contact us through the website.
                </p>
              </div>

              <Link to="/" className="terms-button">
                Return to Earth
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
