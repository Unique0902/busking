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
  removeBuskingSong(userId, sid, onUpdate) {
    const listRef = ref(database, `buskings/${userId}/appliance/${sid}`);
    remove(listRef);
    onUpdate();
  }
  applyNewBuskingSong(userId, title, artist, sid, onUpdate) {
    const listRef = ref(database, `buskings/${userId}/appliance/${sid}`);
    const song = { artist, sid: sid, title, cnt: 1, id: Date.now() };
    set(listRef, song);
    onUpdate();
  }
  applyOldBuskingSong(userId, sid, cnt, onUpdate) {
    const listRef = ref(database, `buskings/${userId}/appliance/${sid}/cnt`);
    const newCnt = cnt + 1;
    set(listRef, newCnt);
    onUpdate();
  }
}

export default BuskingRepository;
