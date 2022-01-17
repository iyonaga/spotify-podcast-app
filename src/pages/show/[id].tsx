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
  const [isFollowing, setIsFollowing] = useState<boolean>();

  useEffect(() => {
    const { id } = router.query;
    const getShow = async () => {
      const data = await spotifyApi.getShow(id as string);
      setShow(data.body);
    };

    const getIsFollowing = async () => {
      const data = await spotifyApi.containsMySavedShows([id as string]);
      setIsFollowing(data.body[0]);
    };

    (async () => {
      const promises = [getShow(), getIsFollowing()];
      await Promise.all(promises);
      setIsLoading(false);
    })();
  }, [spotifyApi, router.query]);

  const toggleFollow = async (ids: string[]) => {
    if (isFollowing) {
      await spotifyApi.removeFromMySavedShows(ids);
    } else {
      await spotifyApi.addToMySavedShows(ids);
    }

    setIsFollowing(!isFollowing);
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
      <button onClick={() => toggleFollow([show.id])}>
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
