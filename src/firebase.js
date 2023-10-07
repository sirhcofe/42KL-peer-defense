// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA94DEHVj_Uu0Gx5c1RouOL2dAf1v-0LRA",
  authDomain: "kl-peer-defense.firebaseapp.com",
  projectId: "kl-peer-defense",
  storageBucket: "kl-peer-defense.appspot.com",
  messagingSenderId: "625602812038",
  appId: "1:625602812038:web:df6fd4cae988ecaf8b1907",
  measurementId: "G-55V930MW0M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
