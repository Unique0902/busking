import { database } from './firebase';
import { onValue, ref, remove, set } from 'firebase/database';

class UserRepository {
  syncUserData(userId, onUpdate) {
    const listRef = ref(database, `users/${userId}`);
    onValue(listRef, (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
  }
  checkUser(userId, onUpdate) {
    const listRef = ref(database, `users/${userId}`);
    onValue(listRef, (snapshot) => {
      const value = snapshot.val();
      onUpdate(!!value);
    });
  }
  makeUser(userId, name, onUpdate) {
    this.checkUser(userId, (userData) => {
      if (!userData) {
        const listRef = ref(database, `users/${userId}/`);
        const userData = { name, date: Date.toString() };
        set(listRef, userData);
        onUpdate();
      }
    });
  }
}

export default UserRepository;
