import { database } from './firebase';
import { onValue, ref, remove, set } from 'firebase/database';

class UserRepositorys {
  syncUserData(userId, onUpdate) {
    const listRef = ref(database, `users/${userId}`);
    onValue(listRef, (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
  }
  makeUser(userId, name, date) {
    const listRef = ref(database, `users/${userId}/`);
    const userData = { name, date };
    set(listRef, userData);
  }
}

export default UserRepositorys;
