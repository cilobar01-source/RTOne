import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCYm8G3JmmpQezxx4p4QpaMLeEhuNixNjA",
  authDomain: "rt0108-9fd70.firebaseapp.com",
  projectId: "rt0108-9fd70",
  storageBucket: "rt0108-9fd70.firebasestorage.app",
  messagingSenderId: "1038405084605",
  appId: "1:1038405084605:web:e8f72322234ee8475d9ed4",
  measurementId: "G-8RM8376FQX"
};

// 🔧 Inisialisasi Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
