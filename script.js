// ============ Firebase Config & Init ============ //
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBUv1Rj7p1vBl0gq75XC7NZeJF0--3fKRk",
  authDomain: "portal-rt-cilosari.firebaseapp.com",
  projectId: "portal-rt-cilosari",
  storageBucket: "portal-rt-cilosari.firebasestorage.app",
  messagingSenderId: "712412960541",
  appId: "1:712412960541:web:0fc4127020022bc76ab3f4",
  measurementId: "G-0LRWM5CE1Z"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
