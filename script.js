// =============================================================
// 🔧 KONFIGURASI & INISIALISASI FIREBASE PORTAL RT CILOSARI BARAT
// =============================================================

// Import Firebase SDKs versi 12.3.0
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";

// Konfigurasi project kamu (portal-rt-cilosari)
const firebaseConfig = {
  apiKey: "AIzaSyBUv1Rj7p1vBl0gq75XC7NZeJF0--3fKRk",
  authDomain: "portal-rt-cilosari.firebaseapp.com",
  projectId: "portal-rt-cilosari",
  storageBucket: "portal-rt-cilosari.firebasestorage.app",
  messagingSenderId: "712412960541",
  appId: "1:712412960541:web:0fc4127020022bc76ab3f4",
  measurementId: "G-0LRWM5CE1Z"
};

// Inisialisasi Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Inisialisasi Authentication & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// =============================================================
// 🧩 HELPER FUNKSI GLOBAL (opsional)
// =============================================================

/**
 * Menyimpan profil pengguna baru ke Firestore
 * @param {string} uid - ID unik user dari Firebase Auth
 * @param {object} data - Data tambahan seperti nama, role, dsb.
 */
export async function simpanProfil(uid, data) {
  try {
    const { doc, setDoc, serverTimestamp } = await import(
      "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js"
    );
    await setDoc(doc(db, "profiles", uid), {
      ...data,
      createdAt: serverTimestamp()
    });
    console.log("✅ Profil tersimpan:", uid);
  } catch (err) {
    console.error("❌ Gagal simpan profil:", err);
  }
}

/**
 * Logout pengguna
 */
export async function keluarAkun() {
  const { signOut } = await import("https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js");
  try {
    await signOut(auth);
    alert("👋 Anda telah logout.");
    window.location.href = "login.html";
  } catch (err) {
    console.error("❌ Error logout:", err);
  }
}

/**
 * Ambil data role user aktif (untuk redirect dashboard)
 */
export async function ambilRoleUser(uid) {
  const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js");
  try {
    const snap = await getDoc(doc(db, "profiles", uid));
    if (snap.exists()) {
      return snap.data().role || "WARGA";
    } else {
      return "WARGA";
    }
  } catch (err) {
    console.error("Gagal ambil role:", err);
    return "WARGA";
  }
}
