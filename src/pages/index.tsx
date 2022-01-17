import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NextApplicationPage } from './_app';
import EpisodeList from '@/components/EpisodeList';
import ShowList from '@/components/ShowList';
import useSpotify from '@/hooks/useSpotify';

const Home: NextApplicationPage = () => {
  const spotifyApi = useSpotify();
  const [shows, setShows] = useState<SpotifyApi.ShowObjectSimplified[]>([]);
  const [episodes, setEpisodes] = useState<SpotifyApi.EpisodeObject[]>([]);

  useEffect(() => {
    const getSavedShows = async () => {
      const shows = await spotifyApi.getMySavedShows({ limit: 5 });
      setShows(shows.body.items.map(({ show }) => show));
    };

    const getSavedEpisodes = async () => {
      const episodes = await spotifyApi.getMySavedEpisodes({ limit: 5 });
      setEpisodes(episodes.body.items.map(({ episode }) => episode));
    };

    getSavedShows();
    getSavedEpisodes();
  }, [spotifyApi]);

  return (
    <>
      <button onClick={() => signOut()}>Sign out</button>
      <hr />
      <h2>ポッドキャスト</h2>
      <Link href="/collection/shows">
        <a>すべて表示</a>
      </Link>
      <ShowList shows={shows} />
      <hr />
      <h2>お気に入りエピソード</h2>
      <Link href="/collection/episodes">
        <a>すべて表示</a>
      </Link>
      <EpisodeList episodes={episodes} />
    </>
  );
};

Home.requireAuth = true;

export default Home;
