// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB8j3ztGDtaHFxftUOvuPrurjKm-wh6QA",
  authDomain: "chatme-114a4.firebaseapp.com",
  projectId: "chatme-114a4",
  storageBucket: "chatme-114a4.appspot.com",
  messagingSenderId: "566494927872",
  appId: "1:566494927872:web:d9b7b1be4183ef9895cce5",
  measurementId: "G-QQMBPS9C0Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
