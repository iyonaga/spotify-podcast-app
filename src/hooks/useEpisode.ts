import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query';
import useSpotify from './useSpotify';

export const useGetEpisode = (
  id: string,
  options?: UseQueryOptions<SpotifyApi.EpisodeObject>
) => {
  const spotifyApi = useSpotify();

  return useQuery<SpotifyApi.EpisodeObject>(
    ['singleEpisode', { id }],
    async () => {
      const data = await spotifyApi.getEpisode(id);
      return data.body;
    },
    {
      ...options,
    }
  );
};

export const useIsFavorite = (
  id: string,
  options?: UseQueryOptions<SpotifyApi.CheckUsersSavedTracksResponse[0]>
) => {
  const spotifyApi = useSpotify();

  return useQuery<SpotifyApi.CheckUsersSavedTracksResponse[0]>(
    ['isFavorite', { id }],
    async () => {
      const data = await spotifyApi.containsMySavedEpisodes([id as string]);
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

    queryClient.invalidateQueries(['isFavorite', { id: episodeId }]);
  };

  return toggleFavorite;
};
