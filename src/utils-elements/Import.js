import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { db } from "../services/firebase/Firebase";

export async function importArrayToFirestore(data, collectionName) {
  if (!Array.isArray(data)) {
    throw new Error("The imported data must be an array");
  }

  for (const item of data) {
    if (item.slug_id) {
      const ref = doc(db, collectionName, item.slug_id);
      await setDoc(ref, item);
    } else if (item.name) {
      const safeId = item.name.toLowerCase().replace(/\s+/g, "_");
      const ref = doc(db, collectionName, safeId);
      await setDoc(ref, item);
    } else {
      await addDoc(collection(db, collectionName), item);
    }
  }
}

export async function importJSONFile(file, collectionName) {
  const text = await file.text();
  const data = JSON.parse(text);
  await importArrayToFirestore(data, collectionName);
}

export async function importCSVFile(file, collectionName) {
  const text = await file.text();

  const result = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
  });

  if (result.errors.length) {
    console.error("CSV parse errors:", result.errors);
    throw new Error("Error parsing CSV file");
  }

  await importArrayToFirestore(result.data, collectionName);
}

export async function importXMLFile(file, collectionName, itemTag = "item") {
  const text = await file.text();

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, "application/xml");

  const parserError = xmlDoc.querySelector("parsererror");
  if (parserError) {
    throw new Error("Invalid XML file");
  }

  const nodes = [...xmlDoc.getElementsByTagName(itemTag)];

  const data = nodes.map((node) => {
    const obj = {};

    [...node.children].forEach((child) => {
      obj[child.tagName] = child.textContent;
    });

    return obj;
  });

  await importArrayToFirestore(data, collectionName);
}

export async function importTXTFile(file, collectionName) {
  const text = await file.text();

  const blocks = text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  const data = blocks.map((block) => {
    const obj = {};

    block.split("\n").forEach((line) => {
      const separatorIndex = line.indexOf(":");
      if (separatorIndex !== -1) {
        const key = line.slice(0, separatorIndex).trim();
        const value = line.slice(separatorIndex + 1).trim();
        obj[key] = value;
      }
    });

    return obj;
  });

  if (!data.length) {
    throw new Error("TXT file is empty or invalid");
  }

  await importArrayToFirestore(data, collectionName);
}

export async function importXLSXFile(file, collectionName) {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });

  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];

  const data = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

  if (!data.length) {
    throw new Error("XLSX file is empty");
  }

  await importArrayToFirestore(data, collectionName);
}

export async function importHTMLFile(file, collectionName) {
  const text = await file.text();

  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(text, "text/html");

  const table = htmlDoc.querySelector("table");
  if (!table) {
    throw new Error("HTML file does not contain a table");
  }

  const headerCells = [...table.querySelectorAll("thead th")];
  const bodyRows = [...table.querySelectorAll("tbody tr")];

  if (!headerCells.length || !bodyRows.length) {
    throw new Error("HTML table is incomplete");
  }

  const headers = headerCells.map((th) => th.textContent.trim());

  const data = bodyRows.map((row) => {
    const cells = [...row.querySelectorAll("td")];
    const obj = {};

    headers.forEach((header, index) => {
      obj[header] = cells[index]?.textContent.trim() ?? "";
    });

    return obj;
  });

  await importArrayToFirestore(data, collectionName);
}