import { useState, useRef, useEffect } from "react";
import videoPioners from "../../data/video/pioners.mp4";
import "./WindowsModal.css";

export default function VideoPopup() {
  const [open, setOpen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (open && videoRef.current) {
      videoRef.current.volume = 0.3;
    }
  }, [open]);

  return (
    <div>
      <button
        className="missions-video-button"
        onClick={() => setOpen(true)}
        type="button"
      >
        ▶ View tribute
      </button>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="video-popup-close"
              onClick={() => setOpen(false)}
              type="button"
            >
              ✕
            </button>

            <video ref={videoRef} controls width="100%">
              <source src={videoPioners} type="video/mp4" />
              Your browser does not support video.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}