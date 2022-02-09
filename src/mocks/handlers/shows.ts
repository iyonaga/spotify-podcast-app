import { rest } from 'msw';
import { ENDPOINTS } from '../constants';
import {
  savedShowsMock,
  showEpisodesMock,
  showObjectMock,
} from '../data/shows';

export const handlers = [
  // Get Show
  rest.get(ENDPOINTS.GET_SHOW, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(showObjectMock));
  }),

  // Get Show Episodes
  rest.get(ENDPOINTS.GET_SHOW_EPISODES, (req, res, ctx) => {
    const offset = Number(req.url.searchParams.get('offset'));
    const limit = Number(req.url.searchParams.get('limit'));

    const generateResponse = (
      limit = 10,
      offset = 0
    ): SpotifyApi.ShowEpisodesResponse => {
      return {
        href: '',
        items: showEpisodesMock.slice(offset, offset + limit),
        limit: limit,
        next: `https://api.spotify.com/v1/me/shows/showId/episodes?offset=${offset}&limit=${limit}&locale=ja,en-US;q=0.9,en;q=0.8`,
        offset: offset,
        previous: null,
        total: showEpisodesMock.length,
      };
    };

    return res(ctx.status(200), ctx.json(generateResponse(limit, offset)));
  }),

  // Get User's Saved Shows
  rest.get(ENDPOINTS.GET_SAVED_SHOWS, (req, res, ctx) => {
    const offset = Number(req.url.searchParams.get('offset'));
    const limit = Number(req.url.searchParams.get('limit'));

    const generateResponse = (
      limit = 10,
      offset = 0
    ): SpotifyApi.UsersSavedShowsResponse => {
      return {
        href: '',
        items: savedShowsMock.slice(offset, offset + limit),
        limit: limit,
        next: `https://api.spotify.com/v1/me/shows?offset=${offset}&limit=${limit}&locale=ja,en-US;q=0.9,en;q=0.8`,
        offset: offset,
        previous: null,
        total: savedShowsMock.length,
      };
    };

    return res(ctx.status(200), ctx.json(generateResponse(limit, offset)));
  }),

  // Save Shows for Current User
  rest.put(ENDPOINTS.SAVE_SHOWS, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  // Remove User's Saved Shows
  rest.delete(ENDPOINTS.REMOVE_SAVED_SHOWS, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  // Check User's Saved Shows
  rest.get(ENDPOINTS.CHECK_SAVED_SHOWS, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([true]));
  }),
];
