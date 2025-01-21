import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAD1Q7VYZedT8mXIsEJmt7O4iLUoCWFxPw",
  authDomain: "lokalbite-db24f.firebaseapp.com",
  projectId: "lokalbite-db24f",
  storageBucket: "lokalbite-db24f.firebasestorage.app",
  messagingSenderId: "172202417713",
  appId: "1:172202417713:web:07a9255dfb6f8e8d6b3f10",
  measurementId: "G-9P3WEDYC2E",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, db, provider, storage, firebaseConfig };
