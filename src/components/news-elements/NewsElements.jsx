import "./NewsElements.css";

function NewsElements({ title, elements = [], type }) {
  if (!elements.length) return null;

  return (
    <section className="elements-section">
      <div className="elements-section-header">
        <h2 className="elements-section-title">{title}</h2>
      </div>

      <div className="elements-grid">
        {elements.map((item) => (
          <article key={item.id} className="element-card">
            {item.imageURL && (
              <div className="element-card-media">
                <img
                  src={item.imageURL}
                  alt={item.name}
                  className="element-card-image"
                />
              </div>
            )}

            <div className="element-card-content">
              <h3 className="element-card-title">{item.name}</h3>
              <p className="element-card-description">{item.shortDescription}</p>

              <div className="element-card-info">
                {item.type && (
                  <div className="element-info-item">
                    <span className="element-info-label">Type</span>
                    <span className="element-info-value">{item.type}</span>
                  </div>
                )}

                {item.discovered && (
                  <div className="element-info-item">
                    <span className="element-info-label">Discovered</span>
                    <span className="element-info-value">{item.discovered}</span>
                  </div>
                )}

                {item.distanceFromEarth && (
                  <div className="element-info-item">
                    <span className="element-info-label">Distance</span>
                    <span className="element-info-value">{item.distanceFromEarth}</span>
                  </div>
                )}

                {item.mass && (
                  <div className="element-info-item">
                    <span className="element-info-label">Mass</span>
                    <span className="element-info-value">{item.mass}</span>
                  </div>
                )}

                {item.diameter && (
                  <div className="element-info-item">
                    <span className="element-info-label">Diameter</span>
                    <span className="element-info-value">{item.diameter}</span>
                  </div>
                )}

                {item.constellation && (
                  <div className="element-info-item">
                    <span className="element-info-label">Constellation</span>
                    <span className="element-info-value">{item.constellation}</span>
                  </div>
                )}

                {item.hostGalaxy && (
                  <div className="element-info-item">
                    <span className="element-info-label">Host Galaxy</span>
                    <span className="element-info-value">{item.hostGalaxy}</span>
                  </div>
                )}

                {item.notableFeature && (
                  <div className="element-info-item element-info-item-full">
                    <span className="element-info-label">Notable Feature</span>
                    <span className="element-info-value">{item.notableFeature}</span>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default NewsElements;