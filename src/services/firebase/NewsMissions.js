import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase"; 

export async function getMissions() {
  try {
    const querySnapshot = await getDocs(collection(db, "missions"));

    const missions = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return missions;
  } catch (error) {
    console.error("Error getting missions:", error);
    return [];
  }
}