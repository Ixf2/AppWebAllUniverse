import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4o0S_TAOZHbtJsJPIOoHFBWLrvTpmj_g",
  authDomain: "appweballuniverse.firebaseapp.com",
  projectId: "appweballuniverse",
  storageBucket: "appweballuniverse.firebasestorage.app",
  messagingSenderId: "395926709460",
  appId: "1:395926709460:web:d8e5d0935eb830bcc38741"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);