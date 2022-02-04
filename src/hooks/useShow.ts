import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query';
import useSpotify from './useSpotify';

export const useGetShow = (
  showId: string,
  options?: UseQueryOptions<SpotifyApi.ShowObject>
) => {
  const spotifyApi = useSpotify();

  return useQuery<SpotifyApi.ShowObject>(
    ['singleShow', { showId }],
    async () => {
      const data = await spotifyApi.getShow(showId);
      return data.body;
    },
    {
      ...options,
    }
  );
};

export const useGetSavedShows = (
  limit = 10,
  options?: UseQueryOptions<SpotifyApi.ShowObjectSimplified[]>
) => {
  const spotifyApi = useSpotify();

  return useQuery<SpotifyApi.ShowObjectSimplified[]>(
    ['savedShows', { limit }],
    async () => {
      const data = await spotifyApi.getMySavedShows({ limit });
      return data.body.items.map(({ show }) => show);
    },
    { ...options }
  );
};

type FetchSavedShowsResponse = {
  items: SpotifyApi.ShowObjectSimplified[];
  nextPage: number;
  totalPages: number;
};

export const useInfiniteSavedShows = (
  limit = 50,
  options?: UseInfiniteQueryOptions<FetchSavedShowsResponse>
) => {
  const spotifyApi = useSpotify();

  const fetchSavedShows = async ({ pageParam = 1 }) => {
    const {
      body: { items, total },
    } = await spotifyApi.getMySavedShows({
      limit,
      offset: (pageParam - 1) * limit,
    });

    return {
      items: items.map(({ show }) => show),
      nextPage: pageParam + 1,
      totalPages: Math.ceil(total / limit),
    };
  };

  return useInfiniteQuery<FetchSavedShowsResponse>(
    ['savedShows'],
    fetchSavedShows,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.nextPage <= lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      },
      ...options,
    }
  );
};

type FetchShowEpisodesResponse = {
  items: SpotifyApi.EpisodeObjectSimplified[];
  nextPage: number;
  totalPages: number;
};

export const useInfiniteShowEpisodes = (
  showId: string,
  options?: UseInfiniteQueryOptions<FetchShowEpisodesResponse>
) => {
  const spotifyApi = useSpotify();

  const fetchShowEpisodes = async ({ pageParam = 1 }) => {
    const limit = 50;
    const {
      body: { items, total },
    } = await spotifyApi.getShowEpisodes(showId, {
      limit,
      offset: (pageParam - 1) * limit,
    });

    return {
      items,
      nextPage: pageParam + 1,
      totalPages: Math.ceil(total / limit),
    };
  };

  return useInfiniteQuery<FetchShowEpisodesResponse>(
    ['showEpisodes', { showId }],
    fetchShowEpisodes,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.nextPage <= lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      },
      ...options,
    }
  );
};

export const useIsFollowing = (
  showId: string,
  options?: UseQueryOptions<boolean>
) => {
  const spotifyApi = useSpotify();

  return useQuery<boolean>(
    ['isFollowing', { showId }],
    async () => {
      const data = await spotifyApi.containsMySavedShows([showId]);
      return data.body[0];
    },
    { ...options }
  );
};

export const useFollow = () => {
  const spotifyApi = useSpotify();

  return useMutation((id: string) => {
    return spotifyApi.addToMySavedShows([id]);
  });
};

export const useUnFollow = () => {
  const spotifyApi = useSpotify();

  return useMutation((id: string) => {
    return spotifyApi.removeFromMySavedShows([id]);
  });
};

export const useToggleFollow = () => {
  const queryClient = useQueryClient();
  const followMutation = useFollow();
  const unFollowMutation = useUnFollow();

  const toggleFollow = async (showId: string, isFollowing: boolean) => {
    if (isFollowing) {
      await unFollowMutation.mutateAsync(showId);
    } else {
      await followMutation.mutateAsync(showId);
    }

    queryClient.invalidateQueries(['isFollowing', { showId }]);
  };

  return toggleFollow;
};
