import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
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

  async function loadMissions() {
    try {
      setLoading(true);
      const data = await getMissions();
      setMissions(data);
    } catch (error) {
      console.error("Error loading missions:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
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
                In honor of all the animals whose sacrifice made space
                exploration possible. They will always shine in space, like
                Laika, Félicette and Ham.
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
            <NewsMissions missions={missions} onRefresh={loadMissions} />
          </div>
        </main>
      )}

      <Footer />
    </>
  );
}