// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDp36G5oh-otAKLU_r_DuN8zDYp_WV1PFI",
  authDomain: "hephaestus-7ec3a.firebaseapp.com",
  projectId: "hephaestus-7ec3a",
  storageBucket: "hephaestus-7ec3a.appspot.com",
  messagingSenderId: "132893027702",
  appId: "1:132893027702:web:f2ef92e1f1cc20ec539e57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
