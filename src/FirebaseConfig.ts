// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "YOUR_LOCAL_API_KEY", // Provide a default for local development
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "your-project-id",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "YOUR_SENDER_ID",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
