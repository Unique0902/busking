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
        api_key: '0cd7b6bd9fb340e51ac82d4104054ca4',
      },
    });
    return response;
  }
}
class SearchSongByArtist {}
class SearchArtist {}

export default Lastfm;
