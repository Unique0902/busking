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
        api_key: process.env.LASTFM_API_KEY,
      },
    });
    return response.data.results;
  }
}
class SearchSongByArtist {}
class SearchArtist {}

export default Lastfm;
