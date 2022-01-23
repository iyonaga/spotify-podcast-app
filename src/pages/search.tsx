import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import type { NextApplicationPage } from './_app';
import EpisodeList from '@/components/EpisodeList';
import Heading from '@/components/Heading';
import ShowList from '@/components/ShowList';
import useSpotify from '@/hooks/useSpotify';
import { queryState } from '@/states/searchState';

const Search: NextApplicationPage = () => {
  const spotifyApi = useSpotify();
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

  const { isLoading } = useQuery(
    ['search', { query }],
    async () => {
      const data = await spotifyApi.search(query, ['show', 'episode']);
      return data.body;
    },
    {
      enabled: query.length > 0,
      onSuccess: (data) => {
        setShows(data.shows!.items);
        setEpisodes(data.episodes!.items);
      },
    }
  );

  return (
    <>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <>
          <Heading className="mb-[30px]">ポッドキャスト</Heading>
          {shows.length > 0 ? <ShowList shows={shows} /> : <p>No results</p>}
          <Heading tag="h2" variant="h1" className="mt-[50px] mb-[20px]">
            エピソード
          </Heading>
          {episodes.length > 0 ? (
            <EpisodeList episodes={episodes} displayShowName={true} />
          ) : (
            <p>No results</p>
          )}
        </>
      )}
    </>
  );
};

Search.requireAuth = true;

export default Search;
