import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSession } from 'next-auth/react';
import React, { ReactNode } from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import EpisodeDetail from '@/components/model/episode/EpisodeDetail';
import * as hooks from '@/hooks/useEpisode';
import { spotifyApi } from '@/lib/spotify';
import { episodeObjectMock } from '@/mocks/episodesMock';

jest.mock('next-auth/react');
const useSessionMocked = jest.mocked(useSession);
useSessionMocked.mockReturnValue({
  data: {
    accessToken: 'accessToken',
    expires: '',
  },
  status: 'authenticated',
});

const queryCache = new QueryCache();
const queryClient = new QueryClient({
  queryCache,
});

const Wrapper: React.VFC<{ children: ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('components/model/episode/EpisodeDetail.tsx', () => {
  beforeEach(() => {
    queryCache.clear();
  });

  test('ボタンをクリックするとtoggleFavorite()が呼ばれる', async () => {
    const useToggleFavoriteMocked = jest.spyOn(hooks, 'useToggleFavorite');
    const toggleFavoriteMock = jest.fn();
    useToggleFavoriteMocked.mockImplementation(() => {
      return toggleFavoriteMock;
    });
    const isFavorite = true;
    const containsMySavedEpisodesMocked = jest.spyOn(
      spotifyApi,
      'containsMySavedEpisodes'
    );
    containsMySavedEpisodesMocked.mockResolvedValue({
      body: [isFavorite],
      headers: {},
      statusCode: 200,
    });

    render(
      <Wrapper>
        <EpisodeDetail episode={episodeObjectMock} />
      </Wrapper>
    );
    const button = await screen.findByRole('button');
    userEvent.click(button);
    expect(toggleFavoriteMock).toHaveBeenCalledWith(
      episodeObjectMock.id,
      isFavorite
    );
  });
});
