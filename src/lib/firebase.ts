import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

function cleanEnv(val: unknown): string {
  if (!val || typeof val !== "string") return "";
  const trimmed = val.trim();
  // Strip accidental quotes if user entered "AIzaSy..." in Vercel UI
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

export function getFirebaseConfig() {
  const metaEnv = typeof import.meta !== "undefined" ? import.meta.env : undefined;
  const procEnv = typeof process !== "undefined" ? process.env : undefined;

  return {
    apiKey: cleanEnv(
      metaEnv?.VITE_FIREBASE_API_KEY ||
        metaEnv?.FIREBASE_API_KEY ||
        procEnv?.VITE_FIREBASE_API_KEY ||
        procEnv?.FIREBASE_API_KEY ||
        "",
    ),
    authDomain: cleanEnv(
      metaEnv?.VITE_FIREBASE_AUTH_DOMAIN ||
        metaEnv?.FIREBASE_AUTH_DOMAIN ||
        procEnv?.VITE_FIREBASE_AUTH_DOMAIN ||
        procEnv?.FIREBASE_AUTH_DOMAIN ||
        "",
    ),
    projectId: cleanEnv(
      metaEnv?.VITE_FIREBASE_PROJECT_ID ||
        metaEnv?.FIREBASE_PROJECT_ID ||
        procEnv?.VITE_FIREBASE_PROJECT_ID ||
        procEnv?.FIREBASE_PROJECT_ID ||
        "",
    ),
    storageBucket: cleanEnv(
      metaEnv?.VITE_FIREBASE_STORAGE_BUCKET ||
        metaEnv?.FIREBASE_STORAGE_BUCKET ||
        procEnv?.VITE_FIREBASE_STORAGE_BUCKET ||
        procEnv?.FIREBASE_STORAGE_BUCKET ||
        "",
    ),
    messagingSenderId: cleanEnv(
      metaEnv?.VITE_FIREBASE_MESSAGING_SENDER_ID ||
        metaEnv?.FIREBASE_MESSAGING_SENDER_ID ||
        procEnv?.VITE_FIREBASE_MESSAGING_SENDER_ID ||
        procEnv?.FIREBASE_MESSAGING_SENDER_ID ||
        "",
    ),
    appId: cleanEnv(
      metaEnv?.VITE_FIREBASE_APP_ID ||
        metaEnv?.FIREBASE_APP_ID ||
        procEnv?.VITE_FIREBASE_APP_ID ||
        procEnv?.FIREBASE_APP_ID ||
        "",
    ),
    measurementId: cleanEnv(
      metaEnv?.VITE_FIREBASE_MEASUREMENT_ID ||
        metaEnv?.FIREBASE_MEASUREMENT_ID ||
        procEnv?.VITE_FIREBASE_MEASUREMENT_ID ||
        procEnv?.FIREBASE_MEASUREMENT_ID ||
        "",
    ),
  };
}

export function isFirebaseConfigured(): boolean {
  const cfg = getFirebaseConfig();
  return Boolean(
    cfg.apiKey &&
    cfg.apiKey !== "undefined" &&
    cfg.apiKey !== "null" &&
    cfg.projectId &&
    cfg.projectId !== "undefined" &&
    cfg.projectId !== "null",
  );
}

let app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;

function ensureApp(): FirebaseApp | null {
  if (typeof window === "undefined") {
    return null;
  }
  if (!isFirebaseConfigured()) {
    return null;
  }
  if (!app) {
    const existing = getApps();
    if (existing.length > 0) {
      app = getApp();
    } else {
      const config = getFirebaseConfig();
      app = initializeApp(config);
    }
  }
  return app;
}

export function getFirebaseAuth(): Auth | null {
  if (typeof window === "undefined") return null;
  if (!_auth) {
    const firebaseApp = ensureApp();
    if (firebaseApp) {
      try {
        _auth = getAuth(firebaseApp);
      } catch (err) {
        console.warn("Failed to initialize Firebase Auth:", err);
        return null;
      }
    }
  }
  return _auth;
}

export function getDb(): Firestore | null {
  if (typeof window === "undefined") return null;
  if (!_db) {
    const firebaseApp = ensureApp();
    if (firebaseApp) {
      try {
        _db = getFirestore(firebaseApp);
      } catch (err) {
        console.warn("Failed to initialize Firestore:", err);
        return null;
      }
    }
  }
  return _db;
}

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
