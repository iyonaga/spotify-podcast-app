import { rest } from 'msw';
import { ENDPOINTS } from '../constants';
import { searchResponseMock } from '../data/search';

export const handlers = [
  // Search for Item
  rest.get(ENDPOINTS.SEARCH_ITEMS, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(searchResponseMock));
  }),
];
