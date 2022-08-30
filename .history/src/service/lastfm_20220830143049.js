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
        limit: '6',
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
        limit: '6',
        format: 'json',
      },
    });
    return response.data.results;
  }
  async searchArtist(artist) {
    const response = await this.lastfm.get('', {
      params: {
        method: 'artist.search',
        artist: artist,
        format: 'json',
      },
    });
    return response.data.results;
  }
  async searchTopTrackByCorrectArtist(mbid) {
    const response = await this.lastfm.get('', {
      params: {
        method: 'artist.gettoptrack',
        mbid: mbid,
        format: 'json',
      },
    });
    return response.data.results;
  }
}

export default Lastfm;
