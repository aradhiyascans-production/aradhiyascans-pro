import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, query, limit, setDoc, where } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage, isFirebaseConfigured, withTimeout } from "./firebase";
import { type MedicalTest, type TestProfile } from "./types";
export const SEED_TESTS: MedicalTest[] = [];

export const SEED_PROFILES: TestProfile[] = [];

function isSeedTestName(name: string): boolean {
  return SEED_TESTS.some(s => s.name.toLowerCase() === name.toLowerCase());
}

function isSeedProfileName(name: string): boolean {
  return SEED_PROFILES.some(s => s.name.toLowerCase() === name.toLowerCase());
}

export async function fetchTests(): Promise<MedicalTest[]> {
  if (!isFirebaseConfigured || !db) return SEED_TESTS;
  
  try {
    const q = query(collection(db, "tests"), limit(150));
    const snap = await withTimeout(getDocs(q));
    const allDbItems = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<MedicalTest, "id"> & { isDeleted?: boolean }) }));
    
    const items = allDbItems.filter(item => !item.isDeleted);
    
    const dbNames = new Set(allDbItems.map(i => i.name.toLowerCase()));
    const uniqueSamples = SEED_TESTS.filter(s => !dbNames.has(s.name.toLowerCase()));
    
    return [...items, ...uniqueSamples];
  } catch (err) {
    console.error("Error fetching tests:", err);
    return SEED_TESTS;
  }
}

export async function addTest(data: Omit<MedicalTest, "id">) {
  if (!db) throw new Error("Firebase not configured");
  return withTimeout(addDoc(collection(db, "tests"), data));
}

export async function updateTest(id: string, data: Partial<MedicalTest>) {
  if (!db) throw new Error("Firebase not configured");
  return withTimeout(updateDoc(doc(db, "tests", id), data));
}

export async function deleteTest(id: string) {
  if (!db || !storage) throw new Error("Firebase not configured");
  
  const docRef = doc(db, "tests", id);
  const snap = await withTimeout(getDoc(docRef));
  
  let name = "";
  let isSeed = SEED_TESTS.some(s => s.id === id);
  
  if (snap.exists()) {
    const data = snap.data();
    name = data.name || "";
    if (isSeedTestName(name)) {
      isSeed = true;
    }
    if (data.sampleReportUrl && data.sampleReportUrl.includes("firebasestorage")) {
      try {
        const fileRef = ref(storage, data.sampleReportUrl);
        await withTimeout(deleteObject(fileRef));
      } catch (err) {
        console.error("Failed to delete sample report from storage:", err);
      }
    }
  } else {
    const seed = SEED_TESTS.find(s => s.id === id);
    if (seed) {
      name = seed.name;
      isSeed = true;
    }
  }

  if (isSeed) {
    return withTimeout(setDoc(docRef, {
      name: name || id,
      isDeleted: true,
      updatedAt: new Date()
    }));
  } else {
    return withTimeout(deleteDoc(docRef));
  }
}

export async function fetchTestProfiles(): Promise<TestProfile[]> {
  if (!isFirebaseConfigured || !db) return SEED_PROFILES;

  try {
    const q = query(collection(db, "test_profiles"), limit(100));
    const snap = await withTimeout(getDocs(q));
    const allDbItems = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<TestProfile, "id"> & { isDeleted?: boolean }) }));
    
    const items = allDbItems.filter(item => !item.isDeleted);
    
    const dbNames = new Set(allDbItems.map(i => i.name.toLowerCase()));
    const uniqueSamples = SEED_PROFILES.filter(s => !dbNames.has(s.name.toLowerCase()));
    
    return [...items, ...uniqueSamples];
  } catch (err) {
    console.error("Error fetching test profiles:", err);
    return SEED_PROFILES;
  }
}

export async function addTestProfile(data: Omit<TestProfile, "id">) {
  if (!db) throw new Error("Firebase not configured");
  return withTimeout(addDoc(collection(db, "test_profiles"), data));
}

export async function updateTestProfile(id: string, data: Partial<TestProfile>) {
  if (!db) throw new Error("Firebase not configured");
  return withTimeout(updateDoc(doc(db, "test_profiles", id), data));
}

export async function deleteTestProfile(id: string) {
  if (!db || !storage) throw new Error("Firebase not configured");

  const docRef = doc(db, "test_profiles", id);
  const snap = await withTimeout(getDoc(docRef));
  
  let name = "";
  let isSeed = SEED_PROFILES.some(s => s.id === id);
  
  if (snap.exists()) {
    const data = snap.data();
    name = data.name || "";
    if (isSeedProfileName(name)) {
      isSeed = true;
    }
    if (data.sampleReportUrl && data.sampleReportUrl.includes("firebasestorage")) {
      try {
        const fileRef = ref(storage, data.sampleReportUrl);
        await withTimeout(deleteObject(fileRef));
      } catch (err) {
        console.error("Failed to delete profile sample report from storage:", err);
      }
    }
  } else {
    const seed = SEED_PROFILES.find(s => s.id === id);
    if (seed) {
      name = seed.name;
      isSeed = true;
    }
  }

  if (isSeed) {
    return withTimeout(setDoc(docRef, {
      name: name || id,
      isDeleted: true,
      updatedAt: new Date()
    }));
  } else {
    return withTimeout(deleteDoc(docRef));
  }
}

export async function fetchServiceBySlug(slug: string, type?: string): Promise<MedicalTest | TestProfile | null> {
  const allSeeds = [...SEED_TESTS, ...SEED_PROFILES];
  const seedMatch = allSeeds.find(s => s.slug === slug || s.id === slug);

  if (!isFirebaseConfigured || !db) return seedMatch || null;

  if (seedMatch) {
    try {
      const collName = SEED_TESTS.some(s => s.id === seedMatch.id) ? "tests" : "test_profiles";
      const docSnap = await withTimeout(getDoc(doc(db, collName, seedMatch.id)));
      if (docSnap.exists() && docSnap.data()?.isDeleted) {
        return null;
      }
    } catch (e) {
      console.warn("Failed to check if seed is deleted, returning seed match:", e);
    }
  }

  try {
    if (type === "package" || type === "profile" || type === "Test Profiles") {
      const qProfile = query(collection(db, "test_profiles"), where("slug", "==", slug), limit(1));
      const snapProfile = await withTimeout(getDocs(qProfile));
      if (!snapProfile.empty) {
        const d = snapProfile.docs[0];
        const data = d.data() as any;
        if (data.isDeleted) return null;
        return { id: d.id, ...data };
      }
    } else if (type === "test" || type === "Tests") {
      const qTest = query(collection(db, "tests"), where("slug", "==", slug), limit(1));
      const snapTest = await withTimeout(getDocs(qTest));
      if (!snapTest.empty) {
        const d = snapTest.docs[0];
        const data = d.data() as any;
        if (data.isDeleted) return null;
        return { id: d.id, ...data };
      }
    }

    const qTest = query(collection(db, "tests"), where("slug", "==", slug), limit(1));
    const snapTest = await withTimeout(getDocs(qTest));
    if (!snapTest.empty) {
      const d = snapTest.docs[0];
      const data = d.data() as any;
      if (data.isDeleted) return null;
      return { id: d.id, ...data };
    }

    const qProfile = query(collection(db, "test_profiles"), where("slug", "==", slug), limit(1));
    const snapProfile = await withTimeout(getDocs(qProfile));
    if (!snapProfile.empty) {
      const d = snapProfile.docs[0];
      const data = d.data() as any;
      if (data.isDeleted) return null;
      return { id: d.id, ...data };
    }

    return seedMatch || null;
  } catch (err) {
    console.error("Error fetching service by slug:", err);
    return seedMatch || null;
  }
}
