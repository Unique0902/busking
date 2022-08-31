import { database } from './firebase';
import { onValue, ref } from 'firebase/database';

class PlaylistRepository {
  syncPlaylist(userId, onUpdate) {
    const ref = ref(`playlists/${userId}`);
    onValue;
  }
}
