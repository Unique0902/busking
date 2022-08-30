'use strict';

class Lastfm {
  constructor(httpClient) {
    this.lastfm = httpClient;
  }
  async searchSongByName(title) {
    const response = await this.lastfm.get('', {
      params: {
        method: 'track.search',
        track: title,
        format: 'json',
      },
    });
    return response.data.results;
  }
  async searchSongByArtist(artist) {
    const response = await this.lastfm.get('', {
      params: {
        method: 'track.search',
        track: ' ',
        artist: artist,
        format: 'json',
      },
    });
    return response.data.results;
  }
}
class SearchSongByArtist {}
class SearchArtist {}

export default Lastfm;
