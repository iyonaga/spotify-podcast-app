import { rest } from 'msw';
import { ENDPOINTS } from '../constants';
import { showObjectMock } from '../data/shows';

export const handlers = [
  // Get Show Episodes
  rest.get(ENDPOINTS.GET_SHOW_EPISODES, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(showObjectMock.episodes));
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
