// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBhRXpddXGGeadKsoMZq_98rAjQdmCNfCI",
  authDomain: "school-app-8df88.firebaseapp.com",
  projectId: "school-app-8df88",
  storageBucket: "school-app-8df88.appspot.com",
  messagingSenderId: "853578148667",
  appId: "1:853578148667:web:3d9c9c497505a89e4ba51e",
  measurementId: "G-28KQ4LG30J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//baza danych
export const db = getFirestore(app);

//auoryzacja
export const auth = getAuth(app);
// const analytics = getAnalytics(app);

//rejestracja przez google
export const googleProvider = new GoogleAuthProvider();