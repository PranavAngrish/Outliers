// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyB9NbY6vEO3eF-w7o2hAitK5XQWOd2nL34",
  authDomain: "outliers-2981c.firebaseapp.com",
  projectId: "outliers-2981c",
  storageBucket: "outliers-2981c.appspot.com",
  messagingSenderId: "849514565613",
  appId: "1:849514565613:web:9d879875a775895f1321e4",
  measurementId: "G-1ZSV65ZKCF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);