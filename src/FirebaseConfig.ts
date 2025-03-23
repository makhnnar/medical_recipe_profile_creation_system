// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDQ50Ikr7s3d3ii4_RSYRbVX5M5JsTqXCI",
    authDomain: "medicalrecipeviewer.firebaseapp.com",
    projectId: "medicalrecipeviewer",
    storageBucket: "medicalrecipeviewer.firebasestorage.app",
    messagingSenderId: "1024119073780",
    appId: "1:1024119073780:web:524fd67007f81ad21867a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
