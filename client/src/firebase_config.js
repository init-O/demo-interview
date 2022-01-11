// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCinmEIz49LQqVLKuuQ4r1eeEpnOUrTd-M",
  authDomain: "interviewhub-1e1fc.firebaseapp.com",
  projectId: "interviewhub-1e1fc",
  storageBucket: "interviewhub-1e1fc.appspot.com",
  messagingSenderId: "765630510046",
  appId: "1:765630510046:web:484ceae19c1a7c30a3634f",
  measurementId: "G-CH2M3VR35Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const authentication = getAuth(app)