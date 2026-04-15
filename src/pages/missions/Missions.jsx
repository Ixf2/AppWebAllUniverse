import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer";
import LoadingScreen from "../../components/loadingscreen/LoadingScreen";
import NewsMissions from "../../components/news-missions/NewsMissions";
import { getMissions } from "../../services/firebase/NewsMissions";
import heroMissions from "../../data/images/missions-hero.jpeg";
import VideoPopup from "../../components/windows-modal/WindowsModal";
import "./Missions.css";

export default function Missions() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMissions() {
      const data = await getMissions();
      setMissions(data);
      setLoading(false);
    }

    loadMissions();
  }, []);

  return (
    <>
      <Header />

      {loading ? (
        <LoadingScreen />
      ) : (
        <main className="missions-page">
          <div className="missions-hero">
            <img
              src={heroMissions}
              alt="Space missions"
              className="missions-hero-image"
            />

            <div className="missions-hero-overlay"></div>

            <div className="missions-hero-text">
              <h2>In honor of the pioneers</h2>
              <p>
                Thanks to Laika, Félicette and Ham, whose courage made space
                exploration possible.
              </p>

              <VideoPopup />
            </div>
          </div>

          <div className="missions-page-header">
            <h1 className="missions-page-title">Space Missions</h1>
            <p className="missions-page-description">
              Explore legendary missions, breakthrough discoveries, and the
              spacecraft that changed our understanding of the universe.
            </p>
          </div>

          <div className="missions-page-content">
            <NewsMissions missions={missions} />
          </div>
        </main>
      )}

      <Footer />
    </>
  );
}