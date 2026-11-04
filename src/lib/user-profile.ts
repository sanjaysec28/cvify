import { doc, getDoc, setDoc, serverTimestamp, type Timestamp } from "firebase/firestore";
import { getDb } from "./firebase";

export type UserProfile = {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  phone: string;
  location: string;
  role: string;
  bio: string;
  linkedin: string;
  github: string;
  lastLogin?: Date | null;
  updatedAt?: Date | null;
};

export type UserProfileInput = Omit<UserProfile, "lastLogin" | "updatedAt">;

function tsToDate(t: unknown): Date | null {
  if (!t) return null;
  const v = t as Timestamp;
  if (typeof v?.toDate === "function") return v.toDate();
  return null;
}

/** Fetch profile; if missing, seed it with the basic Google data. */
export async function getOrCreateUserProfile(seed: {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
}): Promise<UserProfile> {
  const fresh: UserProfile = {
    uid: seed.uid,
    name: seed.name,
    email: seed.email,
    photoURL: seed.photoURL,
    phone: "",
    location: "",
    role: "",
    bio: "",
    linkedin: "",
    github: "",
    lastLogin: null,
    updatedAt: new Date(),
  };

  const db = getDb();
  if (!db) {
    return fresh;
  }

  try {
    const ref = doc(db, "users", seed.uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const d = snap.data() as Partial<UserProfile> & {
        lastLogin?: unknown;
        updatedAt?: unknown;
      };
      return {
        uid: seed.uid,
        name: d.name ?? seed.name,
        email: d.email ?? seed.email,
        photoURL: d.photoURL ?? seed.photoURL,
        phone: d.phone ?? "",
        location: d.location ?? "",
        role: d.role ?? "",
        bio: d.bio ?? "",
        linkedin: d.linkedin ?? "",
        github: d.github ?? "",
        lastLogin: tsToDate(d.lastLogin),
        updatedAt: tsToDate(d.updatedAt),
      };
    }
    await setDoc(
      ref,
      {
        uid: fresh.uid,
        name: fresh.name,
        email: fresh.email,
        photoURL: fresh.photoURL,
        phone: "",
        location: "",
        role: "",
        bio: "",
        linkedin: "",
        github: "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
    return fresh;
  } catch (err) {
    console.warn("Failed to load/create user profile from Firestore:", err);
    return fresh;
  }
}

export async function updateUserProfile(uid: string, patch: Partial<UserProfileInput>) {
  const db = getDb();
  if (!db) return;
  try {
    await setDoc(
      doc(db, "users", uid),
      { ...patch, uid, updatedAt: serverTimestamp() },
      { merge: true },
    );
  } catch (err) {
    console.warn("Failed to update user profile in Firestore:", err);
  }
}
