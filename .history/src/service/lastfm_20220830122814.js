'use strict';

import axios from 'axios';

class Lastfm {
  constructor(httpClient) {
    this.lastfm = httpClient;
  }
  async searchSongByName(title) {
    const response = await this.lastfm.get('songs', {
      params: {
        track: title,
        format: 'json',
      },
    });
    return response;
  }
}
class SearchSongByArtist {}
class SearchArtist {}
