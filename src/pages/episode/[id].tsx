import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { NextApplicationPage } from '../_app';
import useSpotify from '@/hooks/useSpotify';

const SingleEpisode: NextApplicationPage = () => {
  const spotifyApi = useSpotify();
  const [episode, setEpisode] = useState<SpotifyApi.EpisodeObject>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState<boolean>();

  useEffect(() => {
    const { id } = router.query;

    const getEpisode = async () => {
      const data = await spotifyApi.getEpisode(id as string);
      setEpisode(data.body);
    };

    const getIsFavorite = async () => {
      const data = await spotifyApi.containsMySavedEpisodes([id as string]);
      setIsFavorite(data.body[0]);
    };

    (async () => {
      const promises = [getEpisode(), getIsFavorite()];
      await Promise.all(promises);
      setIsLoading(false);
    })();
  }, [spotifyApi, router.query]);

  const toggleFavorite = async (ids: string[]) => {
    if (isFavorite) {
      await spotifyApi.removeFromMySavedEpisodes(ids);
    } else {
      await spotifyApi.addToMySavedEpisodes(ids);
    }

    setIsFavorite(!isFavorite);
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
      <button onClick={() => toggleFavorite([episode.id])}>
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
