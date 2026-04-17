import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import Papa from "papaparse";
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

export async function importXMLFile(file, collectionName, itemTag = "mission") {
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
