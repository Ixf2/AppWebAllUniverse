import { useRef, useEffect } from "react";
// import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import videoTermsLegal from "../../data/video/terms-and-legal2.mp4";
import "./Legal.css";
import LoadingScreen from "../../components/loadingscreen/LoadingScreen";

export default function Legal() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  return (
    <div className="legal-layout">
      {/* <Header /> */}
      <LoadingScreen />
      <main className="legal-page">
        <video
          ref={videoRef}
          className="legal-video"
          src={videoTermsLegal}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />

        <div className="legal-overlay"></div>

        <div className="legal-ui">
          <div className="legal-content-box">
            <div className="legal-text-container">
              <h1>Legal Notice</h1>
              <p>
                This website, AppWebAllUniverse, is owned and operated for
                educational and informational purposes related to astronomy,
                space exploration, and the universe. All content published on
                this website, including text, images, videos, graphics, and data
                about planets, stars, nebulae, black holes, and other celestial
                objects, is the intellectual property of AppWebAllUniverse
                unless otherwise stated. Unauthorized reproduction,
                distribution, or modification of any content is strictly
                prohibited without prior written consent. The information
                provided on this website is intended for general knowledge and
                educational use. While we strive to ensure accuracy and keep
                content up to date, we do not guarantee the completeness,
                reliability, or precision of the information. Scientific
                knowledge evolves over time, and some representations may be
                simplified, artistic, or simulated. Users agree to use this
                website responsibly and not engage in activities that may harm,
                disrupt, or compromise its functionality, security, or
                accessibility. Any attempt to gain unauthorized access to the
                system or misuse the platform is strictly forbidden. This
                website may include links to third-party websites.
                AppWebAllUniverse is not responsible for the content, policies,
                or practices of external sites. To the maximum extent permitted
                by law, AppWebAllUniverse shall not be held liable for any
                damages or losses resulting from the use or inability to use
                this website or its content. We reserve the right to modify this
                Legal Notice at any time without prior notice. Continued use of
                the website implies acceptance of any updates. For any
                inquiries, please contact us through the website.
              </p>
            </div>

            <Link to="/" className="legal-button">
              RETURN TO EARTH
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
