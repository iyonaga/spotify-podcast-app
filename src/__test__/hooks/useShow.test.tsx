import { renderHook } from '@testing-library/react-hooks';
import { rest } from 'msw';
import { useSession } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  useFollow,
  useGetSavedShows,
  useGetShow,
  useInfiniteSavedShows,
  useInfiniteShowEpisodes,
  useIsFollowing,
  useUnFollow,
} from '@/hooks/useShow';
import { ENDPOINTS } from '@/mocks/constants';
import {
  savedShowsMock,
  showEpisodesMock,
  showObjectMock,
} from '@/mocks/data/shows';
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
  test('useGetShow', async () => {
    const { result, waitFor } = renderHook(() => useGetShow('showId'), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toEqual(showObjectMock);
  });

  test('useInfiniteShowEpisodes', async () => {
    const limit = 10;
    const generateMockedResponse = (page: number, limit: number) => {
      return {
        nextPage: page + 1,
        items: showEpisodesMock.slice((page - 1) * limit, page * limit),
        totalPages: Math.ceil(showEpisodesMock.length / limit),
      };
    };

    const { result, waitFor } = renderHook(
      () => useInfiniteShowEpisodes('showId', limit),
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

  test('useGetSavedShows', async () => {
    const { result, waitFor } = renderHook(() => useGetSavedShows(1), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toEqual([savedShowsMock[0].show]);
  });

  test('useInfiniteSavedShows', async () => {
    const limit = 10;
    const generateMockedResponse = (page: number, limit: number) => {
      return {
        nextPage: page + 1,
        items: savedShowsMock
          .slice((page - 1) * limit, page * limit)
          .reduce<SpotifyApi.ShowObjectSimplified[]>((acc, item) => {
            acc.push(item.show);
            return acc;
          }, []),
        totalPages: Math.ceil(savedShowsMock.length / limit),
      };
    };

    const { result, waitFor } = renderHook(() => useInfiniteSavedShows(limit), {
      wrapper,
    });

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

  test('useIsFollowing', async () => {
    const { result, waitFor } = renderHook(() => useIsFollowing('showId'), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toBeTruthy();
  });

  test('useFollow', async () => {
    const mockFn = jest.fn();
    server.use(
      rest.put(ENDPOINTS.SAVE_SHOWS, (req, res, ctx) => {
        mockFn(req.body);
        return res(ctx.status(200));
      })
    );

    const { result, waitFor } = renderHook(() => useFollow(), {
      wrapper,
    });
    await waitFor(() => {
      result.current.mutate('showId');
      expect(mockFn).toHaveBeenCalledWith(['showId']);
    });
  });

  test('useUnFollow', async () => {
    const mockFn = jest.fn();
    server.use(
      rest.delete(ENDPOINTS.REMOVE_SAVED_SHOWS, (req, res, ctx) => {
        mockFn(req.body);
        return res(ctx.status(200));
      })
    );

    const { result, waitFor } = renderHook(() => useUnFollow(), {
      wrapper,
    });
    await waitFor(() => {
      result.current.mutate('showId');
      expect(mockFn).toHaveBeenCalledWith(['showId']);
    });
  });
});
