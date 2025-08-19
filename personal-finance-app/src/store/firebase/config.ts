
// Your web app's Firebase configuration
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyB9ECvTGppD2fKwQT_-Gz1sRJGf1sdKRy4",
    authDomain: "toy-personal-finance.firebaseapp.com",
    projectId: "toy-personal-finance",
    storageBucket: "toy-personal-finance.firebasestorage.app",
    messagingSenderId: "1011629654961",
    appId: "1:1011629654961:web:dd990ac399eec6e1f6b390",
    measurementId: "G-712WDYXJGZ",
    databaseURL: "https://toy-personal-finance-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const rtdb = getDatabase(app);
// const analytics = getAnalytics(app);