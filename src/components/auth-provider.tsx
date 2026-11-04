import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  setPersistence,
  browserLocalPersistence,
  type User,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getFirebaseAuth, getDb, googleProvider, isFirebaseConfigured } from "@/lib/firebase";

type AuthCtx = {
  user: User | null;
  loading: boolean;
  isConfigured: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConfigured] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return isFirebaseConfigured();
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isFirebaseConfigured()) {
      console.warn(
        "[CVify] Firebase environment variables are not configured. Google Sign-In and cloud storage are waiting for Vercel configuration.",
      );
      setLoading(false);
      return;
    }

    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading(false);
      return;
    }

    setPersistence(auth, browserLocalPersistence).catch(() => {});
    const unsub = onAuthStateChanged(
      auth,
      (u) => {
        setUser(u);
        setLoading(false);
      },
      (err) => {
        console.warn("Firebase onAuthStateChanged error:", err);
        setLoading(false);
      },
    );
    return () => unsub();
  }, []);

  async function signInWithGoogle() {
    if (!isFirebaseConfigured()) {
      throw new Error(
        "Firebase Authentication is not configured. Please add VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, and VITE_FIREBASE_PROJECT_ID in your Vercel Project Settings.",
      );
    }
    const auth = getFirebaseAuth();
    if (!auth) {
      throw new Error(
        "Firebase Auth could not be initialized. Please check your Firebase API key in Vercel.",
      );
    }
    const result = await signInWithPopup(auth, googleProvider);
    const u = result.user;
    const db = getDb();
    if (db) {
      try {
        await setDoc(
          doc(db, "users", u.uid),
          {
            uid: u.uid,
            name: u.displayName ?? "",
            email: u.email ?? "",
            photoURL: u.photoURL ?? "",
            lastLogin: serverTimestamp(),
          },
          { merge: true },
        );
      } catch (e) {
        console.warn("Failed to upsert user doc:", e);
      }
    }
  }

  async function logout() {
    const auth = getFirebaseAuth();
    if (auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.warn("Error signing out:", e);
      }
    }
    setUser(null);
  }

  return (
    <Ctx.Provider value={{ user, loading, isConfigured, signInWithGoogle, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
