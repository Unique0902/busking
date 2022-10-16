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
  checkBusking(userId, onUpdate) {
    const listRef = ref(database, `buskings/${userId}`);
    onValue(listRef, (snapshot) => {
      const value = snapshot.val();
      onUpdate(!!value);
    });
  }
  makeBusking(userId, buskingData, onUpdate) {
    this.checkBusking(userId, (buskingData) => {
      if (!buskingData) {
        const listRef = ref(database, `buskings/${userId}/`);
        set(listRef, buskingData);
        onUpdate();
      }
    });
  }
}

export default BuskingRepository;
