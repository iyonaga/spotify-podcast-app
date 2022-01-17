import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import type { NextApplicationPage } from '../_app';
import EpisodeList from '@/components/EpisodeList';
import useSpotify from '@/hooks/useSpotify';

const SingleShow: NextApplicationPage = () => {
  const spotifyApi = useSpotify();
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const { data: show, isLoading: loadingShow } = useQuery(
    ['singleShow', { id }],
    async () => {
      const data = await spotifyApi.getShow(id as string);
      return data.body;
    }
  );

  const { data: isFollowing, isLoading: loadingIsFavorite } = useQuery(
    ['isFollowing', { id }],
    async () => {
      const data = await spotifyApi.containsMySavedShows([id as string]);
      return data.body[0];
    }
  );

  const isLoading = loadingShow && loadingIsFavorite;

  const addToMySavedShows = useMutation((id: string) =>
    spotifyApi.addToMySavedShows([id])
  );

  const removeFromMySavedShows = useMutation((id: string) =>
    spotifyApi.removeFromMySavedShows([id])
  );

  const toggleFollow = async (id: string) => {
    if (isFollowing) {
      await removeFromMySavedShows.mutateAsync(id);
    } else {
      await addToMySavedShows.mutateAsync(id);
    }

    queryClient.setQueriesData(['isFollowing', { id }], !isFollowing);
  };

  if (isLoading) return <p>Loading ...</p>;

  return show ? (
    <>
      <Image
        src={show.images[1].url}
        width={show.images[1].width}
        height={show.images[1].height}
        alt={show.name}
      />
      <h2>{show.name}</h2>
      <p>{show.publisher}</p>
      <button onClick={() => toggleFollow(show.id)}>
        {isFollowing ? 'フォロー解除' : 'フォロー'}
      </button>
      <h3>詳細情報</h3>
      <p>{show.description}</p>
      <h3>エピソード</h3>
      <EpisodeList episodes={show.episodes.items} />
    </>
  ) : null;
};

SingleShow.requireAuth = true;

export default SingleShow;
