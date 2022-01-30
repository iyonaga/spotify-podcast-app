import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import type { NextApplicationPage } from './_app';
import EpisodeList from '@/components/model/episode/EpisodeList';
import EpisodeListPlaceholder from '@/components/model/episode/EpisodeListPlaceholder';
import ShowList from '@/components/model/show/ShowList';
import ShowListPlaceholder from '@/components/model/show/ShowListPlaceholder';
import Heading from '@/components/ui/Heading';
import { useGetSearchResult } from '@/hooks/useSearch';
import { queryState } from '@/states/searchState';

const Search: NextApplicationPage = () => {
  const router = useRouter();
  const [shows, setShows] = useState<SpotifyApi.ShowObjectSimplified[]>([]);
  const [episodes, setEpisodes] = useState<
    SpotifyApi.EpisodeObjectSimplified[]
  >([]);
  const [query, setQuery] = useRecoilState(queryState);

  useEffect(() => {
    const { keyword } = router.query;
    let query = '';

    if (keyword) {
      if (typeof keyword === 'string') {
        query = keyword;
      } else {
        query = keyword[0];
      }
    }

    setQuery(query);
  }, [router.query, setQuery]);

  const { isLoading } = useGetSearchResult(query, {
    onSuccess: (data) => {
      setShows(data.shows!.items);
      setEpisodes(data.episodes!.items);
    },
  });

  return (
    <>
      <Heading className="mb-[30px]">ポッドキャスト</Heading>
      {isLoading ? (
        <ShowListPlaceholder num={20} />
      ) : shows.length ? (
        <ShowList shows={shows} />
      ) : (
        <p>番組が見つかりませんでした</p>
      )}
      <Heading tag="h2" variant="h1" className="mt-[50px] mb-[20px]">
        エピソード
      </Heading>
      {isLoading ? (
        <EpisodeListPlaceholder num={20} />
      ) : episodes.length ? (
        <EpisodeList episodes={episodes} />
      ) : (
        <p>エピソードが見つかりませんでした</p>
      )}
    </>
  );
};

Search.requireAuth = true;

export default Search;
