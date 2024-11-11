// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
export const Auth=getAuth (app);
export default app;