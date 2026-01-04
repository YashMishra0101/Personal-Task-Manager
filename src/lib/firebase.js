import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Replace these values with your own from the Firebase Console
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "personal-task-manager-bb73c.firebaseapp.com",
  projectId: "personal-task-manager-bb73c",
  storageBucket: "personal-task-manager-bb73c.firebasestorage.app",
  messagingSenderId: "428761214884",
  appId: "1:428761214884:web:577cc742aacb79b8389b31",
};

// Initialize Firebase
let app;
let db;
let auth;

try {
  // Only initialize if we have at least an API key, otherwise mock/fail gracefully
  if (firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } else {
    console.warn(
      "Firebase config missing. App will run in demo/offline mode where possible."
    );
  }
} catch (e) {
  console.error("Firebase initialization failed:", e);
}

// Export safe instances or nulls.
// Consumers (AuthContext, TaskContext) need to handle nulls.
// Re-exporting `getAuth` helper wrapper if needed or just using the SDK.
// Actually, standard pattern is to export the initialized services.

import { getAuth } from "firebase/auth";
const safeAuth = app ? getAuth(app) : null;

export { db, safeAuth as auth };
