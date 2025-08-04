// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9ECvTGppD2fKwQT_-Gz1sRJGf1sdKRy4",
  authDomain: "toy-personal-finance.firebaseapp.com",
  projectId: "toy-personal-finance",
  storageBucket: "toy-personal-finance.firebasestorage.app",
  messagingSenderId: "1011629654961",
  appId: "1:1011629654961:web:dd990ac399eec6e1f6b390",
  measurementId: "G-712WDYXJGZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);