import { useEffect, useState } from "react";
import "./LoadingScreen.css";
import ArtemisLogo from "../../data/images/logo.svg";

const loadingTexts = [
  "Initializing Artemis II systems...",
  "Calibrating orbital trajectory...",
  "Scanning nearby planets...",
  "Collecting cosmic data...",
  "Aligning mission parameters...",
  "Stabilizing star map...",
  "Preparing deep space interface...",
  "Launching universe explorer...",
];

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 5;
        return next >= 100 ? 100 : next;
      });
    }, 180);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 1200);

    return () => clearInterval(textInterval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setClosing(true);

      const timeout = setTimeout(() => {
        if (onFinish) onFinish();
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [progress, onFinish]);

  return (
    <div className={`loading-screen ${closing ? "closing" : ""}`}>
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="nebula"></div>
      <div className="planet planet-1"></div>
      <div className="planet planet-2"></div>
      <div className="orbit-ring"></div>

      <div className="loading-content">
        <div className="logo-container">
          <img src={ArtemisLogo} alt="Artemis II" className="logo" />
        </div>

        <h1 className="title">Artemis II</h1>
        <p className="subtitle">Exploring planets, stars and the unknown</p>

        <div className="loading-text">
          <p>{loadingTexts[textIndex]}</p>
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <p className="percentage">{progress}%</p>

        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}