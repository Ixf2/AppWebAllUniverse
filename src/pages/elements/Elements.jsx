import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import LoadingScreen from "../../components/loadingscreen/LoadingScreen";
import NewsElements from "../../components/news-elements/NewsElements";
import {
  getBlackHoles,
  getNebulae,
  getPlanets,
  getStars,
} from "../../services/firebase/NewsElements";
import heroElements from "../../data/images/elements-hero1.jpeg";
import "./Elements.css";

export default function Elements() {
  const [blackHoles, setBlackHoles] = useState([]);
  const [nebulae, setNebulae] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadElements() {
    try {
      setLoading(true);

      const [blackHolesData, nebulaeData, planetsData, starsData] =
        await Promise.all([
          getBlackHoles(),
          getNebulae(),
          getPlanets(),
          getStars(),
        ]);

      setBlackHoles(blackHolesData);
      setNebulae(nebulaeData);
      setPlanets(planetsData);
      setStars(starsData);
    } catch (error) {
      console.error("Error loading elements:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadElements();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <main className="elements-page">
          <div className="elements-hero">
            <img
              src={heroElements}
              alt="Cosmic elements and celestial bodies"
              className="elements-hero-image"
            />

            <div className="elements-hero-overlay"></div>

            <div className="elements-hero-text">
              <h2>Explore the structure of the universe</h2>
              <p>
                Discover black holes, nebulae, planets, and stars, the cosmic
                wonders that shape the universe we observe today.
              </p>
            </div>
          </div>

          <div className="elements-page-header">
            <h1 className="elements-page-title">Cosmic Elements</h1>
            <p className="elements-page-description">
              Explore the most fascinating celestial structures and objects in
              the universe, from massive black holes to glowing nebulae,
              distant planets, and powerful stars.
            </p>
          </div>

          <div className="elements-page-content">
            <NewsElements
              title="Black Holes"
              elements={blackHoles}
              type="black_hole"
              onRefresh={loadElements}
            />

            <NewsElements
              title="Nebulae"
              elements={nebulae}
              type="nebulae"
              onRefresh={loadElements}
            />

            <NewsElements
              title="Planets"
              elements={planets}
              type="planets"
              onRefresh={loadElements}
            />

            <NewsElements
              title="Stars"
              elements={stars}
              type="stars"
              onRefresh={loadElements}
            />
          </div>
        </main>
      )}

      <Footer />
    </>
  );
}