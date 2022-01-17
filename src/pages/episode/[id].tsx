import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery, useQueries, useQueryClient, useMutation } from 'react-query';
import type { NextApplicationPage } from '../_app';
import useSpotify from '@/hooks/useSpotify';

const SingleEpisode: NextApplicationPage = () => {
  const spotifyApi = useSpotify();
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const { data: episode, isLoading: loadingEpisode } = useQuery(
    ['singleEpisode', { id }],
    async () => {
      const data = await spotifyApi.getEpisode(id as string);
      return data.body;
    }
  );

  const { data: isFavorite, isLoading: loadingIsFavorite } = useQuery(
    ['isFavorite', { id }],
    async () => {
      const data = await spotifyApi.containsMySavedEpisodes([id as string]);
      return data.body[0];
    }
  );

  const isLoading = loadingEpisode && loadingIsFavorite;

  const addToMySavedEpisodes = useMutation((id: string) =>
    spotifyApi.addToMySavedEpisodes([id])
  );

  const removeFromMySavedEpisodes = useMutation((id: string) =>
    spotifyApi.removeFromMySavedEpisodes([id])
  );

  const toggleFavorite = async (id: string) => {
    if (isFavorite) {
      await removeFromMySavedEpisodes.mutateAsync(id);
    } else {
      await addToMySavedEpisodes.mutateAsync(id);
    }

    queryClient.setQueryData(['isFavorite', { id }], !isFavorite);
  };

  if (isLoading) return <p>Loading ...</p>;

  return episode ? (
    <>
      <Image
        src={episode.images[1].url}
        width={episode.images[1].width}
        height={episode.images[1].height}
        alt={episode.name}
      />
      <h2>{episode.name}</h2>
      <p>{episode.show.name}</p>
      <button onClick={() => toggleFavorite(episode.id)}>
        {isFavorite ? 'お気に入りから削除' : 'お気に入りに追加'}
      </button>
      <h3>詳細情報</h3>
      <p>{episode.description}</p>
      <Link href={`/show/${episode.show.id}`}>
        <a>すべてのエピソードを表示</a>
      </Link>
    </>
  ) : null;
};

SingleEpisode.requireAuth = true;

export default SingleEpisode;
