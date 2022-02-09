import { handlers as episodesHandlers } from './episodes';
import { handlers as searchHandlers } from './search';
import { handlers as showsHandlers } from './shows';

export const handlers = [
  ...showsHandlers,
  ...episodesHandlers,
  ...searchHandlers,
];
