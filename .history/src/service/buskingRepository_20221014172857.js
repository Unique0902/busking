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
  applyNewBuskingSong(userId, title, artist, sid, ip, onUpdate) {
    const listRef = ref(database, `buskings/${userId}/appliance/${sid}`);
    const song = {
      artist,
      sid: sid,
      title,
      cnt: 1,
      id: Date.now(),
      applicants: [{ ip }],
    };
    set(listRef, song);
    onUpdate();
  }
  checkBuskingSongIp(userId, sid, ip, onUpdate) {
    this.syncApplianceSongData(userId, sid, (data) => {
      const ipArr = Object.values(data.applicants);
      const userIp = ipArr.find((ap) => ap.ip == ip);
      if (!userIp) {
        console.log(1);
        console.log(userIp);
        onUpdate();
      } else {
        console.log(2);
        console.log(userIp);
        window.alert('이미 투표하셨습니다!');
      }
    });
  }
  applyOldBuskingSong(userId, sid, ip, onUpdate) {
    this.syncBuskingData(userId, (data) => {
      const data2 = data.appliance[sid];
      const listRef = ref(database, `buskings/${userId}/appliance/${sid}/cnt`);
      const newCnt = data2.cnt + 1;
      set(listRef, newCnt);
      const listRef2 = ref(
        database,
        `buskings/${userId}/appliance/${sid}/applicants`
      );
      const newApplicants = [{ ip }, ...data2.applicants];
      set(listRef2, newApplicants);
      onUpdate();
    });
  }
}

export default BuskingRepository;
