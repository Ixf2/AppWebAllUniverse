function downloadFile(content, fileName, contentType) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();

  URL.revokeObjectURL(url);
}

function escapeXML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function exportToJSON(data, fileName = "planets.json") {
  const json = JSON.stringify(data, null, 2);
  downloadFile(json, fileName, "application/json");
}

export function exportToCSV(data, fileName = "planets.csv") {
  if (!data.length) return;

  const headers = [...new Set(data.flatMap(item => Object.keys(item)))];

  const rows = data.map(item =>
    headers.map(header => {
      const value = item[header] ?? "";
      return `"${String(value).replace(/"/g, '""')}"`;
    }).join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");
  downloadFile(csv, fileName, "text/csv");
}

export function exportToXML(data, fileName = "planets.xml") {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<planets>\n`;

  for (const item of data) {
    xml += `  <planet>\n`;

    for (const [key, value] of Object.entries(item)) {
      xml += `    <${key}>${escapeXML(value)}</${key}>\n`;
    }

    xml += `  </planet>\n`;
  }

  xml += `</planets>`;

  downloadFile(xml, fileName, "application/xml");
}