import { database } from './firebase';
import { onValue, ref, set } from 'firebase/database';

class PlaylistRepository {
  syncPlaylist(userId, onUpdate) {
    const listRef = ref(database, `playlists/${userId}`);
    onValue(listRef, (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
  }
  saveSong(userId, playlist, song) {
    const listRef = ref(database, `playlists/${userId}/${playlist.id}/songs`);
    set(listRef, song);
  }
  removeSong(userId, song) {
    const listRef = ref(database, `playlists/${userId}/${song.id}`);
    listRef.remove();
  }
}

export default PlaylistRepository;
