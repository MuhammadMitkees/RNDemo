// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx4jg9XDEXFeK_UIrItvuhuOAuBfWtGMU",
  authDomain: "rndemo-72b14.firebaseapp.com",
  projectId: "rndemo-72b14",
  storageBucket: "rndemo-72b14.appspot.com",
  messagingSenderId: "641978767131",
  appId: "1:641978767131:web:dc411e7d6837518227e5be",
  measurementId: "G-Q80EJ6RK6B",
};
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIRESTORE_AUTH = getAuth(FIREBASE_APP);
