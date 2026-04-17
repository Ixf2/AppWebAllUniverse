import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { FaStar, FaRocket, FaGlobe, FaSatellite } from "react-icons/fa";
import AvatarJoana from "../../data/images/box-logo.png"
import AvatarVictor from "../../data/images/box-logo.png"
import "./AboutUs.css";

const team = [
  {
    name: "Joana Ramirez",
    role: "Senior Frontend Developer",
    bio: "Interface architect who turns complex ideas into seamless experiences. Specialized in performance and scalable systems, ensuring every interaction in AllUniverse is fast, intuitive, and visually polished.",
    image: AvatarJoana,
  },
  {
    name: "Víctor Vergara",
    role: "Junior Frontend Developer",
    bio: "Passionate about science and design, she transforms space data into engaging visual stories. Her approach blends scientific curiosity with creativity to make every discovery easy to explore and understand.",
    image: AvatarVictor,
  },
];

const milestones = [
  { year: "2023", label: "Project founded", icon: <FaStar /> },
  { year: "2024", label: "Missions & Elements launched", icon: <FaRocket /> },
  { year: "2025", label: "10 000 monthly visitors", icon: <FaGlobe /> },
  { year: "2026", label: "Artemis II live coverage", icon: <FaSatellite /> },
];

export default function AboutUs() {
  return (
    <>
      <Header />

      <main className="about-page">

        <section className="about-hero">
          <div className="about-hero-image" aria-hidden="true">
          </div>
          <div className="about-hero-overlay" />
          <div className="about-hero-text">
            <span className="about-eyebrow">Who we are</span>
            <div className="hero-header-group">
            <h1>Built by explorers,<br />for explorers</h1>
            <p>
              AllUniverse is an independent educational project born from a shared
              obsession with the cosmos. We translate the complexity of space into
              stories, visuals, and interactive experiences anyone can enjoy.
            </p>
            </div>
          </div>
        </section>

        <section className="about-mission">
          <div className="about-section-inner">
            <h2 className="about-section-title">Our Mission</h2>
            <p className="about-section-subtitle">
              Space exploration is one of humanity's greatest achievements — yet
              it often feels distant and technical. Our mission is simple: make
              the universe feel personal, accessible, and endlessly fascinating.
            </p>

            <div className="about-pillars">
              <div className="about-pillar">
                <FaRocket className="pillar-icon" />
                <h3>Inspire</h3>
                <p>
                  Ignite curiosity about the universe through compelling
                  narratives and immersive visuals.
                </p>
              </div>
              <div className="about-pillar">
                <FaGlobe className="pillar-icon" />
                <h3>Educate</h3>
                <p>
                  Deliver rigorously researched content about missions,
                  celestial elements, and cosmic phenomena.
                </p>
              </div>
              <div className="about-pillar">
                <FaSatellite className="pillar-icon" />
                <h3>Connect</h3>
                <p>
                  Build a community that shares our passion for space, science,
                  and the unknown.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-timeline-section">
          <div className="about-section-inner">
            <h2 className="about-section-title">Our Journey</h2>
            <div className="about-timeline">
              {milestones.map((m, i) => (
                <div className="timeline-item" key={i}>
                  <div className="timeline-icon">{m.icon}</div>
                  <div className="timeline-body">
                    <span className="timeline-year">{m.year}</span>
                    <span className="timeline-label">{m.label}</span>
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="timeline-connector" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-team-section">
          <div className="about-section-inner">
            <h2 className="about-section-title">Meet the Team</h2>
            <p className="about-section-subtitle">
              A small crew of developers, designers, and space lovers who believe
              the universe deserves a beautiful interface.
            </p>

            <div className="about-team-grid">
              {team.map((member, i) => (
                <div className="about-team-card" key={i}>
                  <div className="team-avatar" aria-hidden="true" style={{ backgroundImage: `url(${member.image})` }}></div>
                  <h3 className="team-name">{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p className="team-bio">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-cta">
          <div className="about-section-inner about-cta-inner">
            <h2>Ready to explore?</h2>
            <p>
              Dive into space missions, discover cosmic elements, and follow the
              latest news from the edge of the observable universe.
            </p>
            <div className="about-cta-buttons">
              <a href="/missions" className="cta-btn cta-btn--primary">
                Explore Missions
              </a>
              <a href="/elements" className="cta-btn cta-btn--ghost">
                Cosmic Elements
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}