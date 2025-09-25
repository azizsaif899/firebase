/**
 * @file Firebase Authentication Configuration (CRITICAL-001)
 * @description Sets up Firebase Authentication providers (Google and Email).
 * Exports the auth instance and providers for immediate use in the UI.
 */

import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
import app from './firebase.config';

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
// Optional: force account selection every time
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Email Auth Provider for password-based sign-in
export const emailProvider = new EmailAuthProvider();
