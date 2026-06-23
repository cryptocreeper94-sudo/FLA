/**
 * LumeAuto — Firebase Client SDK
 * Shared auth via DarkWave Auth Firebase project.
 * 
 * DarkWave Studios LLC — Copyright 2026
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByHm_Zwo9NGZ3DyHtZ5_wCtHlLXcat23Q",
  authDomain: "darkwave-auth.firebaseapp.com",
  projectId: "darkwave-auth",
  storageBucket: "darkwave-auth.firebasestorage.app",
  messagingSenderId: "41307406912",
  appId: "1:41307406912:web:9a674f22472924b52a55a5",
  measurementId: "G-3YHVG8K6L8",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ── Domain Whitelist ──
const ALLOWED_DOMAINS = ['darkwavestudios.com', 'darkwavestudios.com'];
const ALLOWED_EMAILS = ['kathytidwell74@gmail.com', 'rtaron@bellsouth.net', 'cryptocreeper94@gmail.com', 'averymackenna@gmail.com', 'barrycline33@gmail.com', 'pcdirect97@gmail.com'];

function validateEmailDomain(email: string | null): void {
  if (!email) throw new Error('No email address found on this account.');
  const lower = email.trim().toLowerCase();
  const domain = lower.split('@')[1];
  if (ALLOWED_EMAILS.includes(lower)) return;
  if (!domain || !ALLOWED_DOMAINS.includes(domain)) {
    throw new Error('Access restricted to authorized email addresses.');
  }
}

// ── Providers ──
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("email");
googleProvider.addScope("profile");

const microsoftProvider = new OAuthProvider('microsoft.com');
microsoftProvider.addScope('email');
microsoftProvider.addScope('profile');
microsoftProvider.addScope('openid');
// Hint the FLA tenant so users land on their familiar Microsoft login
microsoftProvider.setCustomParameters({ prompt: 'select_account' });

// ── Sign-In Helpers ──

export async function signInWithMicrosoft(): Promise<User> {
  const result = await signInWithPopup(auth, microsoftProvider);
  validateEmailDomain(result.user.email);
  return result.user;
}

export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  validateEmailDomain(result.user.email);
  return result.user;
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  const cleanEmail = email.trim();
  validateEmailDomain(cleanEmail);
  const result = await signInWithEmailAndPassword(auth, cleanEmail, password);
  return result.user;
}

export async function registerWithEmail(email: string, password: string): Promise<User> {
  const cleanEmail = email.trim();
  validateEmailDomain(cleanEmail);
  const result = await createUserWithEmailAndPassword(auth, cleanEmail, password);
  return result.user;
}

export async function firebaseSignOut(): Promise<void> {
  await signOut(auth);
}

export { onAuthStateChanged, type User };
