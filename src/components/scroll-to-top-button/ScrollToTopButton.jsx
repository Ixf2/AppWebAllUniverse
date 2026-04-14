import { useState } from "react";
import "./ScrollToTopButton.css";

export default function ScrollToTopButton() {
  const [visible] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`scroll-top-btn ${visible ? "show" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to top"
    >
      <span className="orbit-core">↑</span>
      <span className="orbit-ring orbit-ring-1"></span>
      <span className="orbit-ring orbit-ring-2"></span>
      <span className="orbit-dot orbit-dot-1"></span>
      <span className="orbit-dot orbit-dot-2"></span>
    </button>
  );
}