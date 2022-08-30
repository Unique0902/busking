import 'firebase/auth';
import 'firebase/database';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth;

export firebaseAuth;
export const firebaseDatabase = firebaseApp.database;
export const googleProvider = firebaseAuth.GoogleAuthProvider();
export const githubProvider = firebaseAuth.GithubAuthProvider();
