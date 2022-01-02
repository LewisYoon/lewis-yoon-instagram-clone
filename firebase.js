// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVVYap5GzS-508WRa-MQdg5lb-3VsNyDw",
  authDomain: "instagram-021212.firebaseapp.com",
  projectId: "instagram-021212",
  storageBucket: "instagram-021212.appspot.com",
  messagingSenderId: "796322521594",
  appId: "1:796322521594:web:af33264ffe60c025f6c443",
  measurementId: "G-4NHV9TBQXC",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
const analytics = getAnalytics(app);
