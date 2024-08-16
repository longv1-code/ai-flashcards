// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxY4KCdjGTzMtK8tlsMxkbaI2vMqjHTWU",
  authDomain: "ai-flashcards-5a4d9.firebaseapp.com",
  projectId: "ai-flashcards-5a4d9",
  storageBucket: "ai-flashcards-5a4d9.appspot.com",
  messagingSenderId: "731046642240",
  appId: "1:731046642240:web:aecaeab4278501140ad5a5",
  measurementId: "G-WC9KQMNN5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}