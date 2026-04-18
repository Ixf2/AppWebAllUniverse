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
      await setDoc(doc(db, collectionName, item.slug_id), item);
    } else if (item.name) {
      const id = item.name.toLowerCase().replace(/\s+/g, "_");
      await setDoc(doc(db, collectionName, id), item);
    } else {
      await addDoc(collection(db, collectionName), item);
    }
  }
}

// JSON______________________________________________________________
export async function importJSONFile(file, collectionName) {
  const data = JSON.parse(await file.text());
  await importArrayToFirestore(data, collectionName);
}

// CSV______________________________________________________________
export async function importCSVFile(file, collectionName) {
  const { data, errors } = Papa.parse(await file.text(), {
    header: true,
    skipEmptyLines: true,
  });

  if (errors.length) throw new Error("Error parsing CSV file");

  await importArrayToFirestore(data, collectionName);
}

// XML______________________________________________________________
export async function importXMLFile(file, collectionName, itemTag = "item") {
  const xml = new DOMParser().parseFromString(await file.text(), "application/xml");

  if (xml.querySelector("parsererror")) {
    throw new Error("Invalid XML file");
  }

  const data = [...xml.getElementsByTagName(itemTag)].map((node) => {
    const obj = {};
    [...node.children].forEach((c) => (obj[c.tagName] = c.textContent));
    return obj;
  });

  await importArrayToFirestore(data, collectionName);
}

// TXT______________________________________________________________
export async function importTXTFile(file, collectionName) {
  const data = (await file.text())
    .split(/\n\s*\n/)
    .map((block) => {
      const obj = {};
      block.split("\n").forEach((line) => {
        const i = line.indexOf(":");
        if (i > -1) obj[line.slice(0, i).trim()] = line.slice(i + 1).trim();
      });
      return obj;
    })
    .filter((o) => Object.keys(o).length);

  if (!data.length) throw new Error("Invalid TXT file");

  await importArrayToFirestore(data, collectionName);
}

// XLSX______________________________________________________________
export async function importXLSXFile(file, collectionName) {
  const wb = XLSX.read(await file.arrayBuffer(), { type: "array" });

  const data = XLSX.utils.sheet_to_json(
    wb.Sheets[wb.SheetNames[0]],
    { defval: "" }
  );

  if (!data.length) throw new Error("Empty XLSX file");

  await importArrayToFirestore(data, collectionName);
}

// HTML______________________________________________________________
export async function importHTMLFile(file, collectionName) {
  const doc = new DOMParser().parseFromString(await file.text(), "text/html");

  const headers = [...doc.querySelectorAll("thead th")].map((th) =>
    th.textContent.trim()
  );

  const rows = [...doc.querySelectorAll("tbody tr")];

  if (!headers.length || !rows.length) {
    throw new Error("Invalid HTML table");
  }

  const data = rows.map((row) => {
    const obj = {};
    [...row.querySelectorAll("td")].forEach((td, i) => {
      obj[headers[i]] = td.textContent.trim();
    });
    return obj;
  });

  await importArrayToFirestore(data, collectionName);
}