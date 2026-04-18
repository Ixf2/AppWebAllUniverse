import { useState } from "react";
import {
  importJSONFile,
  importCSVFile,
  importXMLFile,
  importTXTFile,
  importXLSXFile,
  importHTMLFile,
} from "../../utils-elements/Import";
import "./ImportElements.css";

function ImportElements({ type, onImported }) {
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
        await importJSONFile(file, type);
      }

      if (format === "csv") {
        await importCSVFile(file, type);
      }

      if (format === "xml") {
        const xmlItemMap = {
          planets: "planet",
          stars: "star",
          nebulae: "nebula",
          black_hole: "blackHole",
        };

        await importXMLFile(file, type, xmlItemMap[type]);
      }

      if (format === "txt") {
        await importTXTFile(file, type);
      }

      if (format === "xlsx") {
        await importXLSXFile(file, type);
      }

      if (format === "html") {
        await importHTMLFile(file, type);
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

  const acceptedFormats = {
    json: ".json",
    csv: ".csv",
    xml: ".xml",
    txt: ".txt",
    xlsx: ".xlsx,.xls",
    html: ".html,.htm",
  };

  return (
    <div className="import-elements">
      <select
        value={format}
        onChange={(e) => setFormat(e.target.value)}
        disabled={status === "loading"}
      >
        <option value="json">JSON</option>
        <option value="csv">CSV</option>
        <option value="xml">XML</option>
        <option value="txt">TXT</option>
        <option value="xlsx">XLSX</option>
        <option value="html">HTML</option>
      </select>

      <input
        type="file"
        accept={acceptedFormats[format]}
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

export default ImportElements;