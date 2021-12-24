import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBPkohWD3YeguJCa4cA5cGRyScBePc8c4I",
  authDomain: "skill-up-ncu.firebaseapp.com",
  projectId: "skill-up-ncu",
  storageBucket: "skill-up-ncu.appspot.com",
  messagingSenderId: "579574009532",
  appId: "1:579574009532:web:a5f1926c7c11a23d7e0ab9"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };