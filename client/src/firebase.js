// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "noor-estate-1.firebaseapp.com",
  projectId: "noor-estate-1",
  storageBucket: "noor-estate-1.firebasestorage.app",
  messagingSenderId: "774462971717",
  appId: "1:774462971717:web:c1e7841b95d3583545a82c",
  measurementId: "G-67MMQ3PKXY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
