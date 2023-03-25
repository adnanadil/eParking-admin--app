// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdlRpCo1T8fdiPXhOXpvEkamyTQF6k3Ug",
  authDomain: "eparking-88b16.firebaseapp.com",
  projectId: "eparking-88b16",
  storageBucket: "eparking-88b16.appspot.com",
  messagingSenderId: "477634532887",
  appId: "1:477634532887:web:8475b01c3b2f1311342e52"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
