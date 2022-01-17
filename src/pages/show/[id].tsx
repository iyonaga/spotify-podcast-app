import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { NextApplicationPage } from '../_app';
import EpisodeList from '@/components/EpisodeList';
import useSpotify from '@/hooks/useSpotify';

const SingleShow: NextApplicationPage = () => {
  const spotifyApi = useSpotify();
  const [show, setShow] = useState<SpotifyApi.ShowObject>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    (async () => {
      const data = await spotifyApi.getShow(id as string);
      setShow(data.body);
      setIsLoading(false);
    })();
  }, [spotifyApi, id]);

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
      <p>フォロー/フォロー解除ボタン</p>
      <h3>詳細情報</h3>
      <p>{show.description}</p>
      <h3>エピソード</h3>
      <EpisodeList episodes={show.episodes.items} />
    </>
  ) : null;
};

SingleShow.requireAuth = true;

export default SingleShow;
