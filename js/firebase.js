// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDi0ZcOA5wtNa6kgxiQpWekU61abTSrX3U",
  authDomain: "js-login-auth-742c7.firebaseapp.com",
  projectId: "js-login-auth-742c7",
  storageBucket: "js-login-auth-742c7.appspot.com",
  messagingSenderId: "102589635020",
  appId: "1:102589635020:web:51037d21ecb4125de2a569"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
