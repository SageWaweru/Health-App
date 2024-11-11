// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBvwWGtzmHc-y1sgQ7Eydosy8qRLqVTKq4",
  authDomain: "health-app-3697a.firebaseapp.com",
  projectId: "health-app-3697a",
  storageBucket: "health-app-3697a.firebasestorage.app",
  messagingSenderId: "176906909946",
  appId: "1:176906909946:web:cabf574cfe09096a6f7143",
  measurementId: "G-KY8GQJ02QF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth =getAuth(app)

const db = getFirestore(app);

export {app,db,auth};