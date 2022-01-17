import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { NextApplicationPage } from './_app';
import EpisodeList from '@/components/EpisodeList';
import ShowList from '@/components/ShowList';
import useSpotify from '@/hooks/useSpotify';

const Search: NextApplicationPage = () => {
  const spotifyApi = useSpotify();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [text, setText] = useState('');
  const [shows, setShows] = useState<SpotifyApi.ShowObjectSimplified[]>([]);
  const [episodes, setEpisodes] = useState<
    SpotifyApi.EpisodeObjectSimplified[]
  >([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      router.push(`/search?keyword=${text}`);
    }
  };

  useEffect(() => {
    const keyword = router.query.keyword;

    if (keyword) {
      setQuery(keyword as string);
    }
  }, [router.query.keyword]);

  useEffect(() => {
    if (query) {
      (async () => {
        const data = await spotifyApi.search(query, ['show', 'episode']);
        setShows(data.body.shows!.items);
        setEpisodes(data.body.episodes!.items);
      })();
    }
  }, [query, spotifyApi]);

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        defaultValue={query}
      />
      <hr />
      <h2>ポッドキャスト</h2>
      {shows.length > 0 ? <ShowList shows={shows} /> : <p>No results</p>}
      <h2>エピソード</h2>
      {episodes.length > 0 ? (
        <EpisodeList episodes={episodes} />
      ) : (
        <p>No results</p>
      )}
    </>
  );
};

Search.requireAuth = true;

export default Search;
