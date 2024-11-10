import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuE8eJCt8p7Bjy0atvz-dirv6994A-xeQ",
  authDomain: "fitness-webapp-1f12e.firebaseapp.com",
  projectId: "fitness-webapp-1f12e",
  storageBucket: "fitness-webapp-1f12e.firebasestorage.app",
  messagingSenderId: "64570445528",
  appId: "1:64570445528:web:6f7f05807e5870aa8e11ad",
  measurementId: "G-0Q806WYWDQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
