// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrcYDLfkK4NxIaJg9mgGeEwAob6GcWvfg",
  authDomain: "golbetrail.firebaseapp.com",
  projectId: "golbetrail",
  storageBucket: "golbetrail.firebasestorage.app",
  messagingSenderId: "795788030639",
  appId: "1:795788030639:web:945937f822136bc37d5a5a",
  measurementId: "G-BJNC8K4711"
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // Get a reference to the Firestore database