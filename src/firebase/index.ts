import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9upVjdFdsY86H8nhK5YGp46kN5hBd7YI",
  authDomain: "gym-trining.firebaseapp.com",
  projectId: "gym-trining",
  storageBucket: "gym-trining.firebasestorage.app",
  messagingSenderId: "700062299336",
  appId: "1:700062299336:web:e67979e3fd6dd170bda1fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { auth };
