const API_BASE_URL = 'https://api.spotify.com/v1';

export const ENDPOINTS = {
  // shows
  GET_SHOW_EPISODES: `${API_BASE_URL}/shows/:id/episodes`,
  SAVE_SHOWS: `${API_BASE_URL}/me/shows`,
  REMOVE_SAVED_SHOWS: `${API_BASE_URL}/me/shows`,
  CHECK_SAVED_SHOWS: `${API_BASE_URL}/me/shows/contains`,

  // episodes
  GET_SAVED_EPISODES: `${API_BASE_URL}/me/episodes`,
  SAVE_EPISODES: `${API_BASE_URL}/me/episodes`,
  REMOVE_SAVED_EPISODES: `${API_BASE_URL}/me/episodes`,
  CHECK_SAVED_EPISODES: `${API_BASE_URL}/me/episodes/contains`,
};
