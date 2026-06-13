'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { auth, isFirebaseConfigured, getFirebaseReachable } from "@/lib/firebase";

interface AuthCtx {
  user: User | null;
  loading: boolean;
  configured: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) { 
      setLoading(false); 
      return; 
    }
    const unsub = onAuthStateChanged(auth, (u) => { 
      setUser(u); 
      setLoading(false); 
    });
    return () => unsub();
  }, []);

  const login = async (email: string, password: string) => {
    if (!auth) throw new Error("Firebase not configured. Add credentials in .env file");
    if (typeof window !== "undefined" && getFirebaseReachable() === false) {
      throw new Error("Authentication blocked. Please disable any active ad-blockers (e.g. uBlock, Brave Shields) and refresh the page.");
    }
    const loginPromise = signInWithEmailAndPassword(auth, email, password);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Login connection timed out. Please check your internet connection or ad-blocker.")), 3000)
    );
    await Promise.race([loginPromise, timeoutPromise]);
  };

  const logout = async () => { 
    if (auth) await signOut(auth); 
  };

  return (
    <Ctx.Provider value={{ user, loading, configured: isFirebaseConfigured, login, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside AuthProvider");
  return v;
}
