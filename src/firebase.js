import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// SmartWay Solar Firebase Configuration (Project: smartway-67935)
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDA_ldxyR5WBwwBGl0QVEaAJCwboLqyhcU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "smartway-67935.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "smartway-67935",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "smartway-67935.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "936468078624",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:936468078624:web:03c22dfde91940e3b7dc45",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-SNNRNS94Z6"
};

// Check if valid Firebase configuration is present
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.apiKey !== 'YOUR_API_KEY'
);

let app = null;
let db = null;
let auth = null;
let storage = null;
let analytics = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
    
    if (typeof window !== 'undefined') {
      isSupported().then((supported) => {
        if (supported) {
          analytics = getAnalytics(app);
        }
      }).catch(() => {});
    }
  } catch (err) {
    console.warn('Firebase initialization warning:', err);
  }
}

export { app, db, auth, storage, analytics };
