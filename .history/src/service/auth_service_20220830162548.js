import { firebaseApp } from './firebase';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  GithubAuthProvider,
} from 'firebase/auth';

class AuthService {
  login(providerName) {
    const authProvider = this.getProvider(providerName);
    const auth = getAuth();
    return signInWithPopup(auth, authProvider);
  }

  logout() {
    signOut();
  }

  onAuthChange(onUserChanged) {
    onAuthStateChanged((user) => {
      onUserChanged(user);
    });
  }

  getProvider(providerName) {
    switch (providerName) {
      case 'Google':
        return new GoogleAuthProvider();
      case 'Github':
        return new GithubAuthProvider();
      default:
        throw new Error(`not supported provider: ${providerName}`);
    }
  }
}

export default AuthService;
