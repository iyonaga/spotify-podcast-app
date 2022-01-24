import Link from 'next/link';
import { useQuery } from 'react-query';
import { NextApplicationPage } from './_app';
import ArrowRightIcon from '@/components/icons/ArrowRight';
import EpisodeList from '@/components/model/episode/EpisodeList';
import ShowList from '@/components/model/show/ShowList';
import Heading from '@/components/ui/Heading';
import useSpotify from '@/hooks/useSpotify';

const Home: NextApplicationPage = () => {
  const spotifyApi = useSpotify();

  const { data: shows, isLoading: loadingShows } = useQuery(
    ['savedShows', { limit: 5 }],
    async () => {
      const data = await spotifyApi.getMySavedShows({ limit: 10 });
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
      <div className="relative mb-[30px]">
        <Heading>ポッドキャスト</Heading>
        <Link href="/collection/shows">
          <a className="flex absolute right-0 bottom-[-10px] items-center hover:opacity-60 transition">
            <p className="mr-[5px] text-[15px]">すべて表示</p>
            <ArrowRightIcon />
          </a>
        </Link>
      </div>
      {loadingShows && <p>Loading ...</p>}
      {shows && <ShowList shows={shows} />}
      <div className="relative mt-[50px] mb-[30px]">
        <Heading tag="h2" variant="h1">
          お気に入りエピソード
        </Heading>
        <Link href="/collection/episodes">
          <a className="flex absolute right-0 bottom-[-10px] items-center hover:opacity-60 transition">
            <p className="mr-[5px] text-[15px]">すべて表示</p>
            <ArrowRightIcon />
          </a>
        </Link>
      </div>
      {loadingEpisodes && <p>Loading ...</p>}
      {episodes && <EpisodeList episodes={episodes} />}
    </>
  );
};

Home.requireAuth = true;

export default Home;
