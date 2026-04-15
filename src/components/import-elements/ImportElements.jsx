import { useState } from "react";
import { importJSONFile, importCSVFile } from "../../utils-elements/Import";

function ImportElements({ type }) {
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState("json");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);

      if (format === "json") {
        await importJSONFile(file, type);
      }

      if (format === "csv") {
        await importCSVFile(file, type);
      }

      alert("Import completed successfully");
    } catch (error) {
      console.error("Import error:", error);
      alert("Error importing file");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="import-elements">
      <select
        value={format}
        onChange={(e) => setFormat(e.target.value)}
        disabled={loading}
      >
        <option value="json">JSON</option>
        <option value="csv">CSV</option>
      </select>

      <input
        type="file"
        accept=".json,.csv"
        onChange={handleFileChange}
        disabled={loading}
      />
    </div>
  );
}

export default ImportElements;