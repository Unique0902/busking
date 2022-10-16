import { database } from './firebase';
import { onValue, ref, remove, set } from 'firebase/database';

class BuskingRepository {
  syncBuskingData(userId, onUpdate) {
    const listRef = ref(database, `buskings/${userId}`);
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
  makeBusking(userId, playlistId, num, name, onUpdate) {
    this.checkBusking(userId, (buskingData) => {
      if (true || !buskingData) {
        const listRef = ref(database, `buskings/${userId}/`);
        const buskingData = { id: Date.now(), playlistId, maxNum: num, name };
        set(listRef, buskingData);
        onUpdate();
      }
    });
  }
  removeBusking(userId, onUpdate) {
    const listRef = ref(database, `buskings/${userId}/`);
    remove(listRef);
    onUpdate();
  }
}

export default BuskingRepository;
