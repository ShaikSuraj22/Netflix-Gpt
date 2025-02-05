// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvP2a8fdKNI8S3Fx8mqPXFX9pqMsUkJGQ",
  authDomain: "netflixgpt-fb35d.firebaseapp.com",
  projectId: "netflixgpt-fb35d",
  storageBucket: "netflixgpt-fb35d.firebasestorage.app",
  messagingSenderId: "872496230616",
  appId: "1:872496230616:web:6ec5984c47ef529e3aa7ad",
  measurementId: "G-TB9P0NNLBW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
