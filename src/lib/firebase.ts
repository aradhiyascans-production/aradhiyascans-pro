// Firebase configuration for Next.js
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, initializeFirestore, persistentLocalCache, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const isFirebaseConfigured = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;

if (isFirebaseConfigured) {
  console.log("Firebase credentials found. Initializing Firebase app...");
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  authInstance = getAuth(app);
  
  if (typeof window !== "undefined") {
    try {
      console.log("Initializing Firestore with persistent local cache...");
      dbInstance = initializeFirestore(app, {
        localCache: persistentLocalCache({})
      });
    } catch (e) {
      console.warn("initializeFirestore failed, falling back to getFirestore:", e);
      dbInstance = getFirestore(app);
    }
    storageInstance = getStorage(app);
  } else {
    dbInstance = getFirestore(app);
    storageInstance = getStorage(app);
  }
} else {
  console.log("Firebase not configured. Skipping initialization.");
}

export const auth = authInstance;
export const db = dbInstance;
export const storage = storageInstance;

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

let isReachable: boolean | null = null;

if (typeof window !== "undefined") {
  try {
    const cached = localStorage.getItem("firebase_reachable");
    if (cached === "true") {
      isReachable = true;
    } else if (cached === "false") {
      isReachable = false;
    }
  } catch (e) {
    console.warn("Failed to load cached reachability state:", e);
  }
}

export function getFirebaseReachable(): boolean | null {
  return isReachable;
}

export async function checkFirebaseReachable(): Promise<{ reachable: boolean; reason?: string }> {
  if (typeof window === "undefined") return { reachable: true };
  
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 4000);
    
    // Attempt to fetch the Firebase API endpoint
    await fetch("https://firestore.googleapis.com/v1/projects/" + (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "aradhiya-scans"), {
      mode: "no-cors",
      signal: controller.signal
    });
    
    clearTimeout(id);
    isReachable = true;
    try {
      localStorage.setItem("firebase_reachable", "true");
    } catch (_) {}
    return { reachable: true };
  } catch (err: any) {
    console.error("Firebase reachability check failed:", err);
    isReachable = false;
    try {
      localStorage.setItem("firebase_reachable", "false");
    } catch (_) {}
    let reason = "Network connection failed or timed out.";
    if (err.name === "AbortError") {
      reason = "Connection timed out (Firebase servers took too long to respond).";
    } else if (typeof window !== "undefined" && !navigator.onLine) {
      reason = "Your device is offline.";
    } else {
      reason = "Blocked by browser extension, ad-blocker (e.g. uBlock, Brave Shields), or firewall rules.";
    }
    return { reachable: false, reason };
  }
}

export async function withTimeout<T>(promise: Promise<T>, ms = 3000): Promise<T> {
  if (typeof window !== "undefined" && isReachable === null) {
    try {
      await checkFirebaseReachable();
    } catch (e) {
      console.warn("Failed to check Firebase reachability:", e);
    }
  }

  if (typeof window !== "undefined" && isReachable === false) {
    return Promise.reject(
      new Error("Database connection blocked. Please disable any active ad-blockers (e.g. uBlock, Brave Shields) and refresh the page.")
    );
  }

  let timeoutId: any;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error("Connection timed out. Please hard-refresh the page (Ctrl+F5) and try again."));
    }, ms);
  });
  
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function uploadFileToStorage(file: File, folder: string): Promise<{ url: string; publicId: string }> {
  if (!storage) throw new Error("Firebase Storage not configured");
  
  const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
  const fileRef = ref(storage, `${folder}/${filename}`);
  
  const metadata = {
    contentType: file.type || 'application/octet-stream',
  };
  
  await withTimeout(uploadBytes(fileRef, file, metadata), 15000);
  const url = await withTimeout(getDownloadURL(fileRef), 10000);
  
  return { url, publicId: fileRef.fullPath };
}
