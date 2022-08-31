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
    const listRef = ref(
      database,
      `playlists/${userId}/${playlist.id}/songs/${song.id}`
    );
    set(listRef, song);
  }
  removeSong(userId, playlist, song) {
    const listRef = ref(
      database,
      `playlists/${userId}/${playlist.id}/songs/${song.id}`
    );
    listRef.remove();
  }
  updateSong() {}
}

export default PlaylistRepository;
