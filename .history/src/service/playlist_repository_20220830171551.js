import { database } from './firebase';
import { onValue, ref } from 'firebase/database';

class PlaylistRepository {
  syncPlaylist(userId, onUpdate) {
    const listRef = ref(`playlists/${userId}`);
    onValue(listRef, (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
  }
}
