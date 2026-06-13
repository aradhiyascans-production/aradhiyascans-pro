import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

// Load .env manually
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.substring(1, value.length - 1);
      }
      process.env[key] = value.trim();
    }
  });
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey) {
  console.error("Firebase config not found in env.");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  console.log("Fetching test profiles...");
  const profilesSnap = await getDocs(collection(db, "test_profiles"));
  let sourcePkg = null;

  profilesSnap.forEach(doc => {
    const data = doc.data();
    if (!data.isDeleted && data.name && data.name.toLowerCase().includes("men")) {
      sourcePkg = data;
      console.log(`Found Source Package: "${data.name}"`);
    }
  });

  if (!sourcePkg) {
    console.error("Error: Could not find any active checkup package containing 'men' in its name.");
    return;
  }

  // Duplicate and rename
  const duplicatePkg = {
    ...sourcePkg,
    name: "WOMEN'S HEALTH CHECK UP",
    slug: "womens-health-check-up"
  };

  console.log("Adding duplicate package with name: " + duplicatePkg.name);
  const newDocRef = await addDoc(collection(db, "test_profiles"), duplicatePkg);
  console.log("Success! Created new package document ID: " + newDocRef.id);
}

run().catch(err => console.error(err));
