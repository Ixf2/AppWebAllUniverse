import { useState } from "react";
import { importJSONFile, importCSVFile, importXMLFile, importTXTFile, importXLSXFile, importHTMLFile } from "../../utils-missions/Import";
import "./ImportMissions.css";

const FORMATS = [
  { value: "json", label: "JSON", accept: ".json" },
  { value: "csv",  label: "CSV",  accept: ".csv" },
  { value: "xml",  label: "XML",  accept: ".xml" },
  { value: "txt",  label: "TXT",  accept: ".txt" },
  { value: "xlsx", label: "XLSX", accept: ".xlsx,.xls" },
  { value: "html", label: "HTML", accept: ".html,.htm" },
];

async function runImport(format, file) {
  if (format === "json")  return importJSONFile(file, "missions");
  if (format === "csv")   return importCSVFile(file, "missions");
  if (format === "xml")   return importXMLFile(file, "missions", "mission");
  if (format === "txt")   return importTXTFile(file, "missions");
  if (format === "xlsx")  return importXLSXFile(file, "missions");
  if (format === "html")  return importHTMLFile(file, "missions");
}

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
      await runImport(format, file);
      setStatus("success");
      setMessage("Import completed successfully");
      setTimeout(() => onImported?.(), 1500);
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Error importing file");
    } finally {
      e.target.value = "";
    }
  };

  const currentFormat = FORMATS.find((f) => f.value === format);

  return (
    <div className="import-missions">
      <select value={format} onChange={(e) => setFormat(e.target.value)} disabled={status === "loading"}>
        {FORMATS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
      </select>

      <input type="file" accept={currentFormat.accept} onChange={handleFileChange} disabled={status === "loading"} />

      {status === "loading" && <p className="import-status loading">Importing...</p>}
      {status === "success" && <p className="import-status success">{message}</p>}
      {status === "error"   && <p className="import-status error">{message}</p>}
    </div>
  );
}

export default ImportMissions;
