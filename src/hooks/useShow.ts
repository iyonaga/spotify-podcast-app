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
  id: string,
  options?: UseQueryOptions<SpotifyApi.ShowObject>
) => {
  const spotifyApi = useSpotify();

  return useQuery<SpotifyApi.ShowObject>(
    ['singleShow', { id }],
    async () => {
      const data = await spotifyApi.getShow(id);
      return data.body;
    },
    {
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
  id: string,
  options?: UseInfiniteQueryOptions<FetchShowEpisodesResponse>
) => {
  const spotifyApi = useSpotify();

  const fetchShowEpisodes = async (id: string, pageParam = 1) => {
    const limit = 50;
    const {
      body: { items, total },
    } = await spotifyApi.getShowEpisodes(id, {
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
    ['showEpisodes', { id }],
    ({ pageParam }) => {
      return fetchShowEpisodes(id, pageParam);
    },
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
  id: string,
  options?: UseQueryOptions<boolean>
) => {
  const spotifyApi = useSpotify();

  return useQuery<boolean>(
    ['isFollowing', { id }],
    async () => {
      const data = await spotifyApi.containsMySavedShows([id as string]);
      return data.body[0];
    },
    { ...options }
  );
};

export const useFollow = () => {
  const spotifyApi = useSpotify();

  return useMutation((id: string) => {
    console.log(id);
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

    queryClient.invalidateQueries(['isFollowing', { id: showId }]);
  };

  return toggleFollow;
};
