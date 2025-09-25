/**
 * @file Firestore Schema and Rules (CRITICAL-002)
 * @description Defines the collection names and provides a template for Firestore security rules.
 * This allows the INT team to quickly bootstrap their database structure and security.
 */

// A centralized place for collection names to avoid typos and ensure consistency.
export const collections = {
  users: 'users',
  chatSessions: 'chatSessions',
  messages: 'messages',
  // Add other collection names here as the project grows
};

// Basic Firestore security rules template. 
// These rules should be copied to the firestore.rules file in the Firebase project.
export const firestoreRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write to their own document.
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Allow authenticated users to read and write to their own chat sessions and messages.
    match /chatSessions/{sessionId} {
      allow read, write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.sessionId == sessionId;
      
      match /messages/{messageId} {
        allow read, write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.sessionId == sessionId;
      }
    }
  }
}`;
