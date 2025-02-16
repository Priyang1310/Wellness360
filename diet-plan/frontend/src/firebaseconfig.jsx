// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDl-FatY1JwbX9pZaWqa-u0g5VSC-iVDTA",
    authDomain: "diet-plan-72301.firebaseapp.com",
    projectId: "diet-plan-72301",
    storageBucket: "diet-plan-72301.firebasestorage.app",
    messagingSenderId: "770580173844",
    appId: "1:770580173844:web:fde0e9b06273f4fbed4301",
    measurementId: "G-YMJFS2NDC5"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };