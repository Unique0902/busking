'use strict';

class Lastfm {
  constructor(httpClient) {
    this.lastfm = httpClient;
  }
  async searchSongByName(title) {
    const response = await this.lastfm.get('songs', {
      params: {
        method: 'track.search',
        track: title,
        format: 'json',
      },
    });
    return response.results;
  }
}
class SearchSongByArtist {}
class SearchArtist {}

export default Lastfm;
