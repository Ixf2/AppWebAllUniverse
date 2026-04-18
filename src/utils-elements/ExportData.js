import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

export function exportToXML(
  data,
  fileName = "data.xml",
  rootName = "items",
  itemName = "item"
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

export function exportToTXT(data, fileName = "data.txt") {
  if (!data.length) return;

  const text = data
    .map((item) =>
      Object.entries(item)
        .map(([key, value]) => `${key}: ${value ?? ""}`)
        .join("\n"),
    )
    .join("\n\n");

  downloadFile(text, fileName, "text/plain");
}

export function exportToHTML(data, fileName = "data.html") {
  if (!data.length) return;

  const headers = [...new Set(data.flatMap((item) => Object.keys(item)))];

  const rows = data
    .map(
      (item) =>
        `<tr>${headers.map((h) => `<td>${item[h] ?? ""}</td>`).join("")}</tr>`,
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Exported Data</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    table {
      border-collapse: collapse;
      width: 100%;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }
    th {
      background: #f5f5f5;
    }
  </style>
</head>
<body>
  <h1>Exported Data</h1>
  <table>
    <thead>
      <tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
</body>
</html>`;

  downloadFile(html, fileName, "text/html");
}

export function exportToXLSX(data, fileName = "data.xlsx") {
  if (!data.length) return;

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  XLSX.writeFile(workbook, fileName);
}

function cleanPDFText(value) {
  return String(value ?? "")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[‐-–—]/g, "-")
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function exportToPDF(data, fileName = "data.pdf") {
  if (!data.length) return;

  const doc = new jsPDF("landscape");

  const columns = [
    { header: "Name", dataKey: "name" },
    { header: "Type", dataKey: "type" },
    { header: "Discovered", dataKey: "discovered" },
    { header: "Distance", dataKey: "distanceFromEarth" },
    { header: "Mass", dataKey: "mass" },
    { header: "Diameter", dataKey: "diameter" },
  ];

  const rows = data.map((item) => ({
    name: item.name ?? "",
    type: item.type ?? "",
    discovered: item.discovered ?? "",
    distanceFromEarth: item.distanceFromEarth ?? "",
    mass: item.mass ?? "",
    diameter: item.diameter ?? "",
  }));

  doc.setFontSize(16);
  doc.text("Exported Data", 14, 15);

  autoTable(doc, {
    columns,
    body: rows,
    startY: 25,
    theme: "grid",
    styles: {
      fontSize: 8,
      cellPadding: 2,
      overflow: "linebreak",
      valign: "middle",
    },
    headStyles: {
      fontSize: 9,
    },
    columnStyles: {
      name: { cellWidth: 35 },
      type: { cellWidth: 25 },
      discovered: { cellWidth: 30 },
      distanceFromEarth: { cellWidth: 35 },
      mass: { cellWidth: 30 },
      diameter: { cellWidth: 30 },
    },
    margin: { top: 20, right: 10, bottom: 10, left: 10 },
  });

  doc.save(fileName);
}