import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? process.env.VITE_FIREBASE_API_KEY,
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ??
    process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ??
    process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ??
    process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ??
    process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? process.env.VITE_FIREBASE_APP_ID,
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ??
    process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

function initFirebase() {
  const firebaseApp =
    getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

  return {
    app: firebaseApp,
    auth: getAuth(firebaseApp),
    db: getFirestore(firebaseApp),
    storage: getStorage(firebaseApp),
  };
}

// Firebase client SDK must run in the browser. Real instances are required —
// Proxy objects fail Firebase's instanceof checks in collection(), signIn(), etc.
const client = typeof window !== "undefined" ? initFirebase() : null;

export const app = client?.app as FirebaseApp;
export const auth = client?.auth as Auth;
export const db = client?.db as Firestore;
export const storage = client?.storage as FirebaseStorage;

export default app;
