'use strict';

import axios from 'axios';

class lastfm {
  constructor(key) {
    this.lastfm = axios.create({
      baseURL: 'https://ws.audioscrobbler.com/2.0',
      params: { key: key },
    });
  }
  async searchSongByName() {}
}
class SearchSongByArtist {}
class SearchArtist {}
