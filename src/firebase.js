import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAy2rvkHuE0WGPpYVHM1dZGP7L_h6ZrVdU",
  authDomain: "stockmanager-ab39e.firebaseapp.com",
  projectId: "stockmanager-ab39e",
  storageBucket: "stockmanager-ab39e.appspot.com",
  messagingSenderId: "195167476845",
  appId: "1:195167476845:web:8bfd43ef57982fe1953364"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };