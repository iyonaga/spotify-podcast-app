import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';
import { useRecoilState } from 'recoil';
import useSpotify from './useSpotify';
import { searchInputState } from '@/states/searchState';

const useSearch = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useRecoilState(searchInputState);

  const handleSearch = useCallback(
    (query) => {
      router.push(`/search?keyword=${query}`);
    },
    [router]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
    },
    [setSearchInput]
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch(searchInput);
      }
    },
    [handleSearch, searchInput]
  );

  return {
    handleChange,
    handleKeyPress,
    handleSearch,
    searchInput,
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
