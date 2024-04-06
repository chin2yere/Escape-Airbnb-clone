// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_FxI9fC8psi2kn7LuEhRu_a4cZYo-J0o",
  authDomain: "escape-a205a.firebaseapp.com",
  projectId: "escape-a205a",
  storageBucket: "escape-a205a.appspot.com",
  messagingSenderId: "591546081441",
  appId: "1:591546081441:web:6bbc14a86f670f24ac10e0",
  measurementId: "G-0VHZ98VDLQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
