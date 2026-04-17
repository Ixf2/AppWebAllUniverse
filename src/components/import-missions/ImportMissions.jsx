import { useState } from "react";
import {
  importJSONFile,
  importCSVFile,
  importXMLFile,
} from "../../utils-missions/Import";
import "./ImportMissions.css";

function ImportMissions({ onImported }) {
  const [format, setFormat] = useState("json");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setStatus("loading");
      setMessage("");

      if (format === "json") {
        await importJSONFile(file, "missions");
      }

      if (format === "csv") {
        await importCSVFile(file, "missions");
      }

      if (format === "xml") {
        await importXMLFile(file, "missions", "mission");
      }

      setStatus("success");
      setMessage("Import completed successfully");

      setTimeout(() => {
        if (onImported) onImported();
      }, 1500);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage(error.message || "Error importing file");
    } finally {
      e.target.value = "";
    }
  };

  return (
    <div className="import-missions">
      <select
        value={format}
        onChange={(e) => setFormat(e.target.value)}
        disabled={status === "loading"}
      >
        <option value="json">JSON</option>
        <option value="csv">CSV</option>
        <option value="xml">XML</option>
      </select>

      <input
        type="file"
        accept=".json,.csv,.xml"
        onChange={handleFileChange}
        disabled={status === "loading"}
      />

      {status === "loading" && (
        <p className="import-status loading">Importing...</p>
      )}

      {status === "success" && (
        <p className="import-status success">{message}</p>
      )}

      {status === "error" && (
        <p className="import-status error">{message}</p>
      )}
    </div>
  );
}

export default ImportMissions;
