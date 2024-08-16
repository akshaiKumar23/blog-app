import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAZxhPtg5hWnldruFq_6LiyRdhahLqqzKE",
  authDomain: "blog-app-cbca0.firebaseapp.com",
  projectId: "blog-app-cbca0",
  storageBucket: "blog-app-cbca0.appspot.com",
  messagingSenderId: "788726171832",
  appId: "1:788726171832:web:edff265cd22e31c3c50c4d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
console.log(app);
