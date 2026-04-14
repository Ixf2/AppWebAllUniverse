import { useEffect, useRef, useState } from "react";
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

export default function LoadingScreen({ onFinish, duration = 4000 }) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [closing, setClosing] = useState(false);

  const startTimeRef = useRef(Date.now());
  const finishedRef = useRef(false);

  const MIN_DURATION = duration;
  const CLOSING_DURATION = 1000;

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;

        let increment = 0;

        if (prev < 25) increment = 2.4;
        else if (prev < 50) increment = 1.6;
        else if (prev < 75) increment = 0.9;
        else if (prev < 90) increment = 0.45;
        else increment = 0.2;

        const next = prev + increment;
        return next >= 100 ? 100 : next;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 1200);

    return () => clearInterval(textInterval);
  }, []);

  useEffect(() => {
    if (progress < 100 || finishedRef.current) return;

    finishedRef.current = true;

    const elapsed = Date.now() - startTimeRef.current;
    const remaining = Math.max(0, MIN_DURATION - elapsed);

    const finishTimeout = setTimeout(() => {
      setClosing(true);

      const closeTimeout = setTimeout(() => {
        if (onFinish) onFinish();
      }, CLOSING_DURATION);

      return () => clearTimeout(closeTimeout);
    }, remaining);

    return () => clearTimeout(finishTimeout);
  }, [progress, onFinish, MIN_DURATION]);

  return (
    <div className={`loading-screen ${closing ? "closing" : ""}`}>
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="nebula"></div>
      <div className="planet planet-1"></div>
      <div className="planet planet-2"></div>
      <div className="orbit-ring"></div>

      <div className="moon"></div>

      <div className="rocket-scene">
        <div className="rocket">
          <div className="rocket-trail"></div>
          <div className="rocket-flame"></div>
          <div className="rocket-engine"></div>
          <div className="rocket-fin rocket-fin-top"></div>
          <div className="rocket-fin rocket-fin-bottom"></div>

          <div className="rocket-main">
            <div className="rocket-window"></div>
            <div className="rocket-stripe"></div>
          </div>

          <div className="rocket-nose"></div>
        </div>
      </div>

      <div className="loading-content">
        <div className="logo-container">
          <img src={ArtemisLogo} alt="Artemis II logo" className="logo" />
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

        <p className="percentage">{Math.floor(progress)}%</p>

        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}