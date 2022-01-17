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
  const { id } = router.query;

  useEffect(() => {
    (async () => {
      const data = await spotifyApi.getEpisode(id as string);
      setEpisode(data.body);
      setIsLoading(false);
    })();
  }, [spotifyApi, id]);

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
