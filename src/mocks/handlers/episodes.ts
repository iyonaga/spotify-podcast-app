import { rest } from 'msw';
import { ENDPOINTS } from '../constants';
import {
  episodeObjectMock,
  episodesMock,
  savedEpisodesMock,
} from '../data/episodes';

export const handlers = [
  // Get Episode
  rest.get(ENDPOINTS.GET_EPISODE, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(episodeObjectMock));
  }),

  // Get User's Saved Episodes
  rest.get(ENDPOINTS.GET_SAVED_EPISODES, (req, res, ctx) => {
    const offset = Number(req.url.searchParams.get('offset'));
    const limit = Number(req.url.searchParams.get('limit'));

    const generateResponse = (
      limit = 10,
      offset = 0
    ): SpotifyApi.UsersSavedEpisodesResponse => {
      return {
        href: '',
        items: savedEpisodesMock.slice(offset, offset + limit),
        limit: limit,
        next: `https://api.spotify.com/v1/me/episodes?offset=${offset}&limit=${limit}&locale=ja,en-US;q=0.9,en;q=0.8`,
        offset: offset,
        previous: null,
        total: savedEpisodesMock.length,
      };
    };

    return res(ctx.status(200), ctx.json(generateResponse(limit, offset)));
  }),

  // Save Episodes for User
  rest.put(ENDPOINTS.SAVE_EPISODES, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  // Remove User's Saved Episodes
  rest.delete(ENDPOINTS.REMOVE_SAVED_EPISODES, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  // Check User's Saved Episodes
  rest.get(ENDPOINTS.CHECK_SAVED_EPISODES, (req, res, ctx) => {
    // console.log(req.url.searchParams.get('ids'));
    return res(ctx.status(200), ctx.json([true]));
  }),
];
