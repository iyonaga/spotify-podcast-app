import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';
import { useRecoilValue } from 'recoil';
import useSpotify from './useSpotify';
import { queryState } from '@/states/searchState';

const useSearch = () => {
  const router = useRouter();
  const [text, setText] = useState('');
  const query = useRecoilValue(queryState);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        router.push(`/search?keyword=${text}`);
      }
    },
    [router, text]
  );

  return {
    handleChange,
    handleKeyPress,
    query,
  };
};

export const useGetSearchResult = (
  query: string,
  options?: UseQueryOptions<SpotifyApi.SearchResponse>
) => {
  const spotifyApi = useSpotify();

  return useQuery<SpotifyApi.SearchResponse>(
    ['search', { query }],
    async () => {
      const data = await spotifyApi.search(query, ['show', 'episode']);
      return data.body;
    },
    {
      enabled: query.length > 0,
      ...options,
    }
  );
};

export default useSearch;
