import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query';
import useSpotify from './useSpotify';

export const useGetEpisode = (
  episodeId: string,
  options?: UseQueryOptions<SpotifyApi.EpisodeObject>
) => {
  const spotifyApi = useSpotify();

  return useQuery<SpotifyApi.EpisodeObject>(
    ['singleEpisode', { episodeId }],
    async () => {
      const data = await spotifyApi.getEpisode(episodeId);
      return data.body;
    },
    {
      ...options,
    }
  );
};

export const useGetSavedEpisodes = (
  limit = 10,
  options?: UseQueryOptions<SpotifyApi.EpisodeObject[]>
) => {
  const spotifyApi = useSpotify();

  return useQuery<SpotifyApi.EpisodeObject[]>(
    ['savedEpisodes', { limit }],
    async () => {
      const data = await spotifyApi.getMySavedEpisodes({ limit });
      return data.body.items.map(({ episode }) => episode);
    },
    {
      ...options,
    }
  );
};

type FetchSavedEpisodesResponse = {
  items: SpotifyApi.EpisodeObject[];
  nextPage: number;
  totalPages: number;
};

export const useInfiniteSavedEpisodes = (
  limit = 50,
  options?: UseInfiniteQueryOptions<FetchSavedEpisodesResponse>
) => {
  const spotifyApi = useSpotify();

  const fetchSavedEpisodes = async ({ pageParam = 1 }) => {
    const {
      body: { items, total },
    } = await spotifyApi.getMySavedEpisodes({
      limit,
      offset: (pageParam - 1) * limit,
    });

    return {
      items: items.map(({ episode }) => episode),
      nextPage: pageParam + 1,
      totalPages: Math.ceil(total / limit),
    };
  };

  return useInfiniteQuery<FetchSavedEpisodesResponse>(
    ['savedEpisodes'],
    fetchSavedEpisodes,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.nextPage <= lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      },
      ...options,
    }
  );
};

export const useIsFavorite = (
  episodeId: string,
  options?: UseQueryOptions<SpotifyApi.CheckUsersSavedTracksResponse[0]>
) => {
  const spotifyApi = useSpotify();

  return useQuery<SpotifyApi.CheckUsersSavedTracksResponse[0]>(
    ['isFavorite', { episodeId }],
    async () => {
      const data = await spotifyApi.containsMySavedEpisodes([episodeId]);
      return data.body[0];
    },
    { ...options }
  );
};

export const useAddFavorite = () => {
  const spotifyApi = useSpotify();

  return useMutation((id: string) => {
    return spotifyApi.addToMySavedEpisodes([id]);
  });
};

export const useRemoveFavorite = () => {
  const spotifyApi = useSpotify();

  return useMutation((id: string) => {
    return spotifyApi.removeFromMySavedEpisodes([id]);
  });
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  const addFavoriteMutation = useAddFavorite();
  const removeFavoriteMutation = useRemoveFavorite();

  const toggleFavorite = async (episodeId: string, isFavorite: boolean) => {
    if (isFavorite) {
      await removeFavoriteMutation.mutateAsync(episodeId);
    } else {
      await addFavoriteMutation.mutateAsync(episodeId);
    }

    queryClient.invalidateQueries(['isFavorite', { episodeId }]);
  };

  return toggleFavorite;
};
