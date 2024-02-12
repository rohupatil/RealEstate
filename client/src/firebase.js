           //logic for signup with google watch at 3.0.0


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-e96f0.firebaseapp.com",
  projectId: "mern-estate-e96f0",
  storageBucket: "mern-estate-e96f0.appspot.com",
  messagingSenderId: "1042340544936",
  appId: "1:1042340544936:web:0353923d71de9ea9b79d9d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);