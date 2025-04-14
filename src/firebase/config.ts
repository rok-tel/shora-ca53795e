
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration - replace with your own in production
const firebaseConfig = {
  apiKey: "AIzaSyDemoKey-ThisIsAplaceholderValueForLovable",
  authDomain: "shora-blog.firebaseapp.com",
  projectId: "shora-blog",
  storageBucket: "shora-blog.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:a1b2c3d4e5f6a7b8c9d0e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

export default app;
