import { episodesMock } from './episodes';
import { showsMock } from './shows';

export const searchResponseMock = {
  shows: {
    href: 'https://api.spotify.com/v1/search?query=podcast&type=show&locale=ja%2Cen-US%3Bq%3D0.9%2Cen%3Bq%3D0.8&offset=0&limit=20',
    items: showsMock,
    limit: 20,
    next: 'https://api.spotify.com/v1/search?query=podcast&type=show&locale=ja%2Cen-US%3Bq%3D0.9%2Cen%3Bq%3D0.8&offset=20&limit=20',
    offset: 0,
    previous: null,
    total: 10014,
  },
  episodes: {
    href: 'https://api.spotify.com/v1/search?query=podcast&type=episode&locale=ja%2Cen-US%3Bq%3D0.9%2Cen%3Bq%3D0.8&offset=0&limit=20',
    items: episodesMock,
    limit: 20,
    next: 'https://api.spotify.com/v1/search?query=podcast&type=episode&locale=ja%2Cen-US%3Bq%3D0.9%2Cen%3Bq%3D0.8&offset=20&limit=20',
    offset: 0,
    previous: null,
    total: 10001,
  },
};
