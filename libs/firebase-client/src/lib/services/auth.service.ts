import {
  Auth,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  UserCredential
} from 'firebase/auth';
import { auth, googleProvider } from '../config/auth.config';

/**
 * @class AuthService
 * @description A service class to abstract Firebase Authentication functionalities.
 * It provides methods for sign-in, sign-out, and observing auth state changes.
 */
export class AuthService {
  private static instance: AuthService;

  /**
   * @constructor
   * @param {Auth} auth - The Firebase Auth instance.
   * @param {GoogleAuthProvider} googleProvider - The Google Auth provider instance.
   */
  constructor(
    private readonly auth: Auth,
    private readonly googleProvider: GoogleAuthProvider
  ) {}

  /**
   * Gets the singleton instance of the AuthService.
   * @returns {AuthService} The singleton instance.
   */
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(auth, googleProvider);
    }
    return AuthService.instance;
  }

  /**
   * Observes authentication state changes.
   * @param {(user: User | null) => void} callback - The callback function to execute when the auth state changes.
   * @returns {import('firebase/auth').Unsubscribe} A function to unsubscribe from the observer.
   */
  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(this.auth, callback);
  }

  /**
   * Signs in the user with Google.
   * @returns {Promise<UserCredential>} A promise that resolves with the user's credential.
   */
  async signInWithGoogle(): Promise<UserCredential> {
    try {
      return await signInWithPopup(this.auth, this.googleProvider);
    } catch (error) {
      // Handle or log the error as needed
      console.error('Error during Google sign-in:', error);
      throw error;
    }
  }

  /**
   * Signs out the current user.
   * @returns {Promise<void>} A promise that resolves when the sign-out is complete.
   */
  async signOut(): Promise<void> {
    try {
      return await signOut(this.auth);
    } catch (error) {
      // Handle or log the error as needed
      console.error('Error during sign-out:', error);
      throw error;
    }
  }

  /**
   * Gets the current authenticated user.
   * @returns {User | null} The current user or null if not authenticated.
   */
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}

// Export a singleton instance of the service
export const authService = AuthService.getInstance();
