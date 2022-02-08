import { rest } from 'msw';
import { ENDPOINTS } from '../constants';

export const handlers = [
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
