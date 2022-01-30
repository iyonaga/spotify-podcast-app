import Link from 'next/link';
import { NextApplicationPage } from './_app';
import ArrowRightIcon from '@/components/icons/ArrowRight';
import EpisodeList from '@/components/model/episode/EpisodeList';
import EpisodeListPlaceholder from '@/components/model/episode/EpisodeListPlaceholder';
import ShowList from '@/components/model/show/ShowList';
import ShowListPlaceholder from '@/components/model/show/ShowListPlaceholder';
import Heading from '@/components/ui/Heading';
import { useGetSavedEpisodes } from '@/hooks/useEpisode';
import { useGetSavedShows } from '@/hooks/useShow';

const Home: NextApplicationPage = () => {
  const { data: shows, isLoading: loadingShows } = useGetSavedShows();
  const { data: episodes, isLoading: loadingEpisodes } = useGetSavedEpisodes();

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
      {loadingShows && <ShowListPlaceholder />}
      {shows &&
        (shows.length ? (
          <ShowList shows={shows} />
        ) : (
          <p>フォロー中の番組はありません</p>
        ))}
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
      {loadingEpisodes && <EpisodeListPlaceholder />}
      {episodes &&
        (episodes.length ? (
          <EpisodeList episodes={episodes} />
        ) : (
          <p>お気に入りのエピソードはありません</p>
        ))}
    </>
  );
};

Home.requireAuth = true;

export default Home;
