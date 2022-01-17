import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { NextApplicationPage } from './_app';
import EpisodeList from '@/components/EpisodeList';
import ShowList from '@/components/ShowList';
import useSpotify from '@/hooks/useSpotify';

const Home: NextApplicationPage = () => {
  const spotifyApi = useSpotify();

  const { data: shows, isLoading: loadingShows } = useQuery(
    ['savedShows', { limit: 5 }],
    async () => {
      const data = await spotifyApi.getMySavedShows({ limit: 5 });
      return data.body.items.map(({ show }) => show);
    }
  );

  const { data: episodes, isLoading: loadingEpisodes } = useQuery(
    ['savedEpisodes', { limit: 5 }],
    async () => {
      const data = await spotifyApi.getMySavedEpisodes({ limit: 5 });
      return data.body.items.map(({ episode }) => episode);
    }
  );

  return (
    <>
      <button onClick={() => signOut()}>Sign out</button>
      <hr />
      <h2>ポッドキャスト</h2>
      <Link href="/collection/shows">
        <a>すべて表示</a>
      </Link>
      {loadingShows && <p>Loading ...</p>}
      {shows && <ShowList shows={shows} />}
      <hr />
      <h2>お気に入りエピソード</h2>
      <Link href="/collection/episodes">
        <a>すべて表示</a>
      </Link>
      {loadingEpisodes && <p>Loading ...</p>}
      {episodes && <EpisodeList episodes={episodes} />}
    </>
  );
};

Home.requireAuth = true;

export default Home;
