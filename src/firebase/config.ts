import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCNui26DWl6zWBrBBbKunTV9kTIp41aaTg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "flutter-proyecto-daaf9.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "flutter-proyecto-daaf9",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "flutter-proyecto-daaf9.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "875997644545",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:875997644545:web:b2d3ef0fdf069faa157d00",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-Y3VWFX1KJ4" // lo dejamos undefined por ahora
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
