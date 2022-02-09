import { renderHook } from '@testing-library/react-hooks';
import { rest } from 'msw';
import { useSession } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  useAddFavorite,
  useGetEpisode,
  useGetSavedEpisodes,
  useInfiniteSavedEpisodes,
  useIsFavorite,
  useRemoveFavorite,
} from '@/hooks/useEpisode';
import { ENDPOINTS } from '@/mocks/constants';
import { episodeObjectMock, savedEpisodesMock } from '@/mocks/data/episodes';
import { server } from '@/mocks/server';

jest.mock('next-auth/react');
const useSessionMocked = jest.mocked(useSession);

useSessionMocked.mockReturnValue({
  data: {
    accessToken: 'accessToken',
    expires: '',
  },
  status: 'authenticated',
});

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('hooks/useEpisode.ts', () => {
  test('useGetEpisode', async () => {
    const { result, waitFor } = renderHook(() => useGetEpisode('episodeId'), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toEqual(episodeObjectMock);
  });

  test('useGetSavedEpisode', async () => {
    const { result, waitFor } = renderHook(() => useGetSavedEpisodes(1), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toEqual([savedEpisodesMock[0].episode]);
  });

  test('useInfiniteSavedEpisodes', async () => {
    const limit = 10;
    const generateMockedResponse = (page: number, limit: number) => {
      return {
        nextPage: page + 1,
        items: savedEpisodesMock
          .slice((page - 1) * limit, page * limit)
          .reduce<SpotifyApi.EpisodeObject[]>((acc, item) => {
            acc.push(item.episode);
            return acc;
          }, []),
        totalPages: Math.ceil(savedEpisodesMock.length / limit),
      };
    };

    const { result, waitFor } = renderHook(
      () => useInfiniteSavedEpisodes(limit),
      {
        wrapper,
      }
    );

    await waitFor(() => result.current.isSuccess);
    expect(result.current.data!.pages).toEqual([
      generateMockedResponse(1, limit),
    ]);
    result.current.fetchNextPage();
    await waitFor(() => result.current.isFetching);
    await waitFor(() => !result.current.isFetching);
    expect(result.current.data!.pages).toEqual([
      generateMockedResponse(1, limit),
      generateMockedResponse(2, limit),
    ]);
  });

  test('useIsFavorite', async () => {
    const { result, waitFor } = renderHook(() => useIsFavorite('episodeId'), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toBeTruthy();
  });

  test('useAddFavorite', async () => {
    const mockFn = jest.fn();
    server.use(
      rest.put(ENDPOINTS.SAVE_EPISODES, (req, res, ctx) => {
        mockFn(req.body);
        return res(ctx.status(200));
      })
    );

    const { result, waitFor } = renderHook(() => useAddFavorite(), {
      wrapper,
    });
    await waitFor(() => {
      result.current.mutate('episodeId');
      expect(mockFn).toHaveBeenCalledWith({ ids: ['episodeId'] });
    });
  });

  test('useRemoveFavorite', async () => {
    const mockFn = jest.fn();
    server.use(
      rest.delete(ENDPOINTS.REMOVE_SAVED_EPISODES, (req, res, ctx) => {
        mockFn(req.body);
        return res(ctx.status(200));
      })
    );

    const { result, waitFor } = renderHook(() => useRemoveFavorite(), {
      wrapper,
    });
    await waitFor(() => {
      result.current.mutate('episodeId');
      expect(mockFn).toHaveBeenCalledWith({ ids: ['episodeId'] });
    });
  });
});
