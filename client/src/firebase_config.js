// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7ELBwd-5eIHxMWIJrFygvJvPzF5DVUCs",
  authDomain: "interviewhub-development.firebaseapp.com",
  projectId: "interviewhub-development",
  storageBucket: "interviewhub-development.appspot.com",
  messagingSenderId: "559647158007",
  appId: "1:559647158007:web:de679d34be8554732eadf2",
  measurementId: "G-L25SV36V2Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const authentication = getAuth(app)