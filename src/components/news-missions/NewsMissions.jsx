import { useState } from "react";
import "./NewsMissions.css";
import {
  exportToJSON,
  exportToCSV,
  exportToXML,
} from "../../utils-missions/ExportData";
import ImportMissions from "../import-missions/ImportMissions";

import videoArtemisII from "../../data/video/artemisII.mp4";
import videoJamesWebb from "../../data/video/jamesWebb.mp4";
import videoVoyager1 from "../../data/video/voyager1.mp4";

const localMissionVideos = {
  "artemis-ii": videoArtemisII,
  "james-webb": videoJamesWebb,
  "voyager-1": videoVoyager1,
};

function NewsMissions({ missions = [], onRefresh }) {
  const [isImportOpen, setIsImportOpen] = useState(false);

  if (!missions.length) return null;

  return (
    <>
      <section className="missions-section">
        <div className="missions-section-header">
          <h2 className="missions-section-title">Space Missions</h2>

          <div className="export-buttons">
            <button onClick={() => exportToJSON(missions, "missions.json")}>
              JSON
            </button>

            <button onClick={() => exportToCSV(missions, "missions.csv")}>
              CSV
            </button>

            <button
              onClick={() =>
                exportToXML(missions, "missions.xml", "missions", "mission")
              }
            >
              XML
            </button>

            <button onClick={() => setIsImportOpen(true)}>Import</button>
          </div>
        </div>

        <div className="missions-grid">
          {missions.map((mission) => {
            const videoSrc = localMissionVideos[mission.slug_id];

            return (
              <article key={mission.id} className="mission-card">
                <div className="mission-card-media">
                  <img
                    src={mission.imageURL}
                    alt={mission.name}
                    className="mission-card-image"
                  />

                  {videoSrc && (
                    <video
                      src={videoSrc}
                      className="mission-card-video"
                      muted
                      loop
                      autoPlay
                      playsInline
                      preload="none"
                    />
                  )}

                  {mission.featured && (
                    <span className="mission-featured-badge">Featured</span>
                  )}
                </div>

                <div className="mission-card-content">
                  <h3 className="mission-card-title">{mission.name}</h3>

                  <p className="mission-card-description">
                    {mission.shortDescription}
                  </p>

                  <div className="mission-card-info">
                    <div className="mission-info-item">
                      <span className="mission-info-label">Type</span>
                      <span className="mission-info-value">{mission.type}</span>
                    </div>

                    <div className="mission-info-item">
                      <span className="mission-info-label">Agency</span>
                      <span className="mission-info-value">
                        {mission.hostAgency}
                      </span>
                    </div>

                    <div className="mission-info-item">
                      <span className="mission-info-label">Launch Vehicle</span>
                      <span className="mission-info-value">
                        {mission.launchVehicle}
                      </span>
                    </div>

                    <div className="mission-info-item">
                      <span className="mission-info-label">Mass</span>
                      <span className="mission-info-value">{mission.mass}</span>
                    </div>

                    <div className="mission-info-item">
                      <span className="mission-info-label">Diameter</span>
                      <span className="mission-info-value">
                        {mission.diameter}
                      </span>
                    </div>

                    <div className="mission-info-item">
                      <span className="mission-info-label">Temperature</span>
                      <span className="mission-info-value">
                        {mission.temperature}
                      </span>
                    </div>

                    <div className="mission-info-item">
                      <span className="mission-info-label">Distance</span>
                      <span className="mission-info-value">
                        {mission.distanceFromEarth}
                      </span>
                    </div>

                    <div className="mission-info-item">
                      <span className="mission-info-label">Discovered</span>
                      <span className="mission-info-value">
                        {mission.discovered}
                      </span>
                    </div>

                    <div className="mission-info-item mission-info-item-full">
                      <span className="mission-info-label">
                        Notable Feature
                      </span>
                      <span className="mission-info-value">
                        {mission.notableFeature}
                      </span>
                    </div>

                    <div className="mission-info-item mission-info-item-full">
                      <span className="mission-info-label">Slug</span>
                      <span className="mission-info-value">
                        {mission.slug_id}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {isImportOpen && (
        <div
          className="import-modal-overlay"
          onClick={() => setIsImportOpen(false)}
        >
          <div
            className="import-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="import-modal-close"
              onClick={() => setIsImportOpen(false)}
            >
              ✕
            </button>

            <h3 className="import-modal-title">Import into Space Missions</h3>
            <p className="import-modal-text">
              Select a JSON, CSV or XML file to import into this collection.
            </p>

            <ImportMissions
              onImported={async () => {
                setIsImportOpen(false);
                if (onRefresh) {
                  await onRefresh();
                }
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default NewsMissions;
