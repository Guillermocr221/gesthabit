// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0Mv1P4JhG8i52SusPzLRL-yajMhYcC0E",
  authDomain: "gesthabit-74244.firebaseapp.com",
  projectId: "gesthabit-74244",
  storageBucket: "gesthabit-74244.firebasestorage.app",
  messagingSenderId: "581180319934",
  appId: "1:581180319934:web:5685425622e9112100d6ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exportamos los servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const storage = getStorage(app);