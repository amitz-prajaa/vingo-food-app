// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "vingo-food-app-a9488.firebaseapp.com",
  projectId: "vingo-food-app-a9488",
  storageBucket: "vingo-food-app-a9488.firebasestorage.app",
  messagingSenderId: "818201398989",
  appId: "1:818201398989:web:bb80663fb9a69de8442384",
  measurementId: "G-6HFJ13S0MJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {app,auth}