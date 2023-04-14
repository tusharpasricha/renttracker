// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwnwu5ZnOWR_eeI0m5dKz__799Rk7SZXY",
  authDomain: "renttracker-80557.firebaseapp.com",
  projectId: "renttracker-80557",
  storageBucket: "renttracker-80557.appspot.com",
  messagingSenderId: "466499095552",
  appId: "1:466499095552:web:7196bb46a795f9d2905ce5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;