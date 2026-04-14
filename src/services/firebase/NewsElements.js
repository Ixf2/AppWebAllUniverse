import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";

async function getCollectionData(collectionName) {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(`Error getting ${collectionName}:`, error);
    return [];
  }
}

export async function getBlackHoles() {
  return getCollectionData("black_hole");
}

export async function getNebulae() {
  return getCollectionData("nebulae");
}

export async function getPlanets() {
  return getCollectionData("planets");
}

export async function getStars() {
  return getCollectionData("stars");
}