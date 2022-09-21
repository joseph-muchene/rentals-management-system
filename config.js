// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMFpe5ESDH2ugfwiCBA48YaghMML0Kxrc",
  authDomain: "rental-a3b34.firebaseapp.com",
  projectId: "rental-a3b34",
  storageBucket: "rental-a3b34.appspot.com",
  messagingSenderId: "768913744073",
  appId: "1:768913744073:web:7ffb150f8ef50bf5af6d18",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
