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

export function exportToJSON(data, fileName = "data.json") {
  const json = JSON.stringify(data, null, 2);
  downloadFile(json, fileName, "application/json");
}

export function exportToCSV(data, fileName = "data.csv") {
  if (!data.length) return;

  const headers = [...new Set(data.flatMap((item) => Object.keys(item)))];

  const rows = data.map((item) =>
    headers
      .map((header) => {
        const value = item[header] ?? "";
        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");
  downloadFile(csv, fileName, "text/csv");
}

export function exportToXML(
  data,
  fileName = "data.xml",
  rootName = "missions",
  itemName = "mission"
) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>\n`;

  for (const item of data) {
    xml += `  <${itemName}>\n`;

    for (const [key, value] of Object.entries(item)) {
      xml += `    <${key}>${escapeXML(value)}</${key}>\n`;
    }

    xml += `  </${itemName}>\n`;
  }

  xml += `</${rootName}>`;

  downloadFile(xml, fileName, "application/xml");
}
