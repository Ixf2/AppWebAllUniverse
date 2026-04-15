import { collection, doc, setDoc, addDoc } from "firebase/firestore";
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