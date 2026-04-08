import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1RKR1SEfcf8SD80olwg9t2O9b_8XbZsw",
  authDomain: "keego-properties.firebaseapp.com",
  projectId: "keego-properties",
  storageBucket: "keego-properties.firebasestorage.app",
  messagingSenderId: "1005799627328",
  appId: "1:1005799627328:web:ab6925cc3e33095c689da5",
  measurementId: "G-58TFE124PH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
