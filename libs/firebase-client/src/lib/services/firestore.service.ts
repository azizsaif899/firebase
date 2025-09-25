import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  DocumentData,
  QuerySnapshot,
  DocumentReference,
  CollectionReference,
} from 'firebase/firestore';
import { firestore } from '../config/firebase.config'; // Using the initialized firestore instance

/**
 * @class FirestoreService
 * @description A generic service to abstract Firestore database operations.
 * It provides generic CRUD methods to interact with any collection.
 */
export class FirestoreService {
  private static instance: FirestoreService;

  /**
   * @constructor
   * @param {Firestore} firestore - The Firebase Firestore instance.
   */
  constructor(private readonly firestore: Firestore) {}

  /**
   * Gets the singleton instance of the FirestoreService.
   * @returns {FirestoreService} The singleton instance.
   */
  public static getInstance(): FirestoreService {
    if (!FirestoreService.instance) {
      FirestoreService.instance = new FirestoreService(firestore);
    }
    return FirestoreService.instance;
  }

  /**
   * Retrieves all documents from a specified collection.
   * @template T
   * @param {string} collectionName - The name of the collection.
   * @returns {Promise<T[]>} A promise that resolves with an array of documents.
   */
  async getAll<T>(collectionName: string): Promise<T[]> {
    const collRef: CollectionReference = collection(this.firestore, collectionName);
    const snapshot: QuerySnapshot<DocumentData> = await getDocs(collRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
  }

  /**
   * Retrieves a single document by its ID from a specified collection.
   * @template T
   * @param {string} collectionName - The name of the collection.
   * @param {string} id - The ID of the document to retrieve.
   * @returns {Promise<T | null>} A promise that resolves with the document data or null if not found.
   */
  async getById<T>(collectionName: string, id: string): Promise<T | null> {
    const docRef: DocumentReference = doc(this.firestore, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return null;
  }

  /**
   * Creates a new document with a specified ID in a collection.
   * @param {string} collectionName - The name of the collection.
   * @param {string} id - The ID for the new document.
   * @param {object} data - The data for the new document.
   * @returns {Promise<void>} A promise that resolves when the document is created.
   */
  async createWithId(collectionName: string, id: string, data: object): Promise<void> {
    const docRef: DocumentReference = doc(this.firestore, collectionName, id);
    return await setDoc(docRef, data);
  }

  /**
   * Updates an existing document in a collection.
   * @param {string} collectionName - The name of the collection.
   * @param {string} id - The ID of the document to update.
   * @param {object} data - The data to update.
   * @returns {Promise<void>} A promise that resolves when the document is updated.
   */
  async update(collectionName: string, id: string, data: object): Promise<void> {
    const docRef: DocumentReference = doc(this.firestore, collectionName, id);
    return await updateDoc(docRef, data);
  }

  /**
   * Deletes a document from a collection.
   * @param {string} collectionName - The name of the collection.
   * @param {string} id - The ID of the document to delete.
   * @returns {Promise<void>} A promise that resolves when the document is deleted.
   */
  async delete(collectionName: string, id: string): Promise<void> {
    const docRef: DocumentReference = doc(this.firestore, collectionName, id);
    return await deleteDoc(docRef);
  }
}

// Export a singleton instance of the service
export const firestoreService = FirestoreService.getInstance();
