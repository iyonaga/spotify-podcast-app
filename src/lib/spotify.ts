import SpotifyWebApi from 'spotify-web-api-node';
// @ts-ignore
import HttpManager from 'spotify-web-api-node/src/http-manager';
// @ts-ignore
import WebApiRequest from 'spotify-web-api-node/src/webapi-request';

interface Response<T> {
  body: T;
  headers: Record<string, string>;
  statusCode: number;
}

class SpotifyApi extends SpotifyWebApi {
  getMySavedEpisodes(
    options: any,
    callback: (
      error: Error,
      response: Response<SpotifyApi.UsersSavedEpisodesResponse>
    ) => void
  ): void;
  getMySavedEpisodes(
    options?: any
  ): Promise<Response<SpotifyApi.UsersSavedEpisodesResponse>>;

  async getMySavedEpisodes(options?: any, callback?: any) {
    return WebApiRequest.builder(this.getAccessToken())
      .withPath('/v1/me/episodes')
      .withQueryParameters(options)
      .build()
      .execute(HttpManager.get, callback);
  }

  async containsMySavedEpisodes(
    ids: string[],
    callback?: any
  ): Promise<Response<SpotifyApi.CheckUsersSavedTracksResponse>> {
    return WebApiRequest.builder(this.getAccessToken())
      .withPath('/v1/me/episodes/contains')
      .withQueryParameters({
        ids: ids.join(','),
      })
      .build()
      .execute(HttpManager.get, callback);
  }

  async addToMySavedEpisodes(ids: string[], callback?: any): Promise<void> {
    return WebApiRequest.builder(this.getAccessToken())
      .withPath('/v1/me/episodes')
      .withHeaders({ 'Content-Type': 'application/json' })
      .withBodyParameters({ ids })
      .build()
      .execute(HttpManager.put, callback);
  }

  async removeFromMySavedEpisodes(
    ids: string[],
    callback?: any
  ): Promise<void> {
    return WebApiRequest.builder(this.getAccessToken())
      .withPath('/v1/me/episodes')
      .withHeaders({ 'Content-Type': 'application/json' })
      .withBodyParameters({ ids })
      .build()
      .execute(HttpManager.del, callback);
  }
}

export const spotifyApi = new SpotifyApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});
