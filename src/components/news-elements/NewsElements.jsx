import { useState } from "react";
import "./NewsElements.css";
import {
  exportToJSON,
  exportToCSV,
  exportToXML,
  exportToTXT,
  exportToHTML,
  exportToXLSX,
  exportToPDF,
} from "../../utils-elements/ExportData";
import ImportElements from "../import-elements/ImportElements";

function NewsElements({ title, elements = [], type, onRefresh }) {
  const [isImportOpen, setIsImportOpen] = useState(false);

  if (!elements.length) return null;

  const xmlConfig = {
    planets: { root: "planets", item: "planet" },
    stars: { root: "stars", item: "star" },
    nebulae: { root: "nebulae", item: "nebula" },
    black_hole: { root: "blackHoles", item: "blackHole" },
  };

  return (
    <>
      <section className="elements-section">
        <div className="elements-section-header">
          <h2 className="elements-section-title">{title}</h2>

          <div className="export-buttons">
            <button onClick={() => exportToJSON(elements, `${type}.json`)}>
              JSON
            </button>

            <button onClick={() => exportToCSV(elements, `${type}.csv`)}>
              CSV
            </button>

            <button
              onClick={() =>
                exportToXML(
                  elements,
                  `${type}.xml`,
                  xmlConfig[type].root,
                  xmlConfig[type].item,
                )
              }
            >
              XML
            </button>
            <button onClick={() => exportToTXT(elements, `${type}.txt`)}>
              TXT
            </button>

            <button onClick={() => exportToHTML(elements, `${type}.html`)}>
              HTML
            </button>

            <button onClick={() => exportToXLSX(elements, `${type}.xlsx`)}>
              XLSX
            </button>

            <button onClick={() => exportToPDF(elements, `${type}.pdf`)}>
              PDF
            </button>

            <button onClick={() => setIsImportOpen(true)}>Import</button>
          </div>
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
                <p className="element-card-description">
                  {item.shortDescription}
                </p>

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
                      <span className="element-info-value">
                        {item.discovered}
                      </span>
                    </div>
                  )}

                  {item.distanceFromEarth && (
                    <div className="element-info-item">
                      <span className="element-info-label">Distance</span>
                      <span className="element-info-value">
                        {item.distanceFromEarth}
                      </span>
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
                      <span className="element-info-value">
                        {item.diameter}
                      </span>
                    </div>
                  )}

                  {item.constellation && (
                    <div className="element-info-item">
                      <span className="element-info-label">Constellation</span>
                      <span className="element-info-value">
                        {item.constellation}
                      </span>
                    </div>
                  )}

                  {item.hostGalaxy && (
                    <div className="element-info-item">
                      <span className="element-info-label">Host Galaxy</span>
                      <span className="element-info-value">
                        {item.hostGalaxy}
                      </span>
                    </div>
                  )}

                  {item.notableFeature && (
                    <div className="element-info-item element-info-item-full">
                      <span className="element-info-label">
                        Notable Feature
                      </span>
                      <span className="element-info-value">
                        {item.notableFeature}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
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

            <h3 className="import-modal-title">Import into {title}</h3>
            <p className="import-modal-text">
              Select a JSON, CSV or XML file to import into this collection.
            </p>

            <ImportElements
              type={type}
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

export default NewsElements;
