import { database } from './firebase';
import { onValue, ref, remove, set } from 'firebase/database';

class BuskingRepository {
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
  makeBusking(userId, name, onUpdate) {
    this.checkUser(userId, (userData) => {
      if (!userData) {
        const listRef = ref(database, `users/${userId}/`);
        const userData = { name, date: Date() };
        set(listRef, userData);
        onUpdate();
      }
    });
  }
}

export default BuskingRepository;
