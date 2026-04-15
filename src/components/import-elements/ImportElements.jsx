import { useState } from "react";
import { importJSONFile} from "../../utils-elements/importData"


function ImportElements({ type }) {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      await importJSONFile(file, type);
      alert("Import completed successfully");
    } catch (error) {
      console.error("Import error:", error);
      alert("Error importing JSON file");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="import-elements">
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        disabled={loading}
      />
    </div>
  );
}

export default ImportElements;