import "./NewsMissions.css";
import videoArtemisII from "../../data/video/artemisII.mp4"

function NewsMissions({ missions = [] }) {
  return (
    <section className="missions-section">
      <div className="missions-grid">
        {missions.map((mission) => (
          <article key={mission.id} className="mission-card">
            <div className="mission-card-media">
              <img
                src={mission.imageURL}
                alt={mission.name}
                className="mission-card-image"
              />

              <video
                src={videoArtemisII}
                className="mission-card-video"
                muted
                loop
                playsInline
                preload="none"
                autoPlay
              />

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
                  <span className="mission-info-value">{mission.diameter}</span>
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
                  <span className="mission-info-label">Notable Feature</span>
                  <span className="mission-info-value">
                    {mission.notableFeature}
                  </span>
                </div>

                <div className="mission-info-item mission-info-item-full">
                  <span className="mission-info-label">Slug</span>
                  <span className="mission-info-value">{mission.slug_id}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default NewsMissions;
