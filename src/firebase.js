import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBjeo8d93S1D0MBfbI4Acd0rubSw2qxhfM",

  authDomain: "kitsunechat-d43ab.firebaseapp.com",

  projectId: "kitsunechat-d43ab",

  storageBucket: "kitsunechat-d43ab.appspot.com",

  messagingSenderId: "648922521942",

  appId: "1:648922521942:web:eb20b4958d8ee9658b36f7",

  measurementId: "G-M2R4XE2263"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db }
