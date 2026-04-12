import {
  collection,
  getDocs,
  query,
  where,
  limit,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./Firebase";

export const NEWS_CATEGORY_IDS = Object.freeze({
  PLANETS: "planets",
  STARS: "stars",
  NEBULAE: "nebulae",
  MISSIONS: "missions",
  BLACK_HOLES: "black_holes",
});

export const NEWS_CATEGORY_LABELS = Object.freeze({
  [NEWS_CATEGORY_IDS.PLANETS]: "Planets",
  [NEWS_CATEGORY_IDS.STARS]: "Stars",
  [NEWS_CATEGORY_IDS.NEBULAE]: "Nebulae",
  [NEWS_CATEGORY_IDS.MISSIONS]: "Missions",
  [NEWS_CATEGORY_IDS.BLACK_HOLES]: "Black Holes",
});

function createSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export async function createNews({
  title,
  description,
  imageURL,
  categoryID,
  categoryLabel,
}) {
  const ref = collection(db, "news");

  const docRef = await addDoc(ref, {
    title,
    description,
    imageURL,
    categoryID,
    categoryLabel,
    slug_id: createSlug(title),
    createdAt: serverTimestamp(),
  });

  return docRef;
}

export async function getNews({ max = 20 } = {}) {
  const ref = collection(db, "news");
  const q = query(ref, orderBy("createdAt", "desc"), limit(max));
  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

export async function getNewsByCategoryID(categoryID, { max = 20 } = {}) {
  const ref = collection(db, "news");

  const q = query(
    ref,
    where("categoryID", "==", categoryID),
    orderBy("createdAt", "desc"),
    limit(max)
  );

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}