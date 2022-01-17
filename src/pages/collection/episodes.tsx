import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { NextApplicationPage } from '../_app';
import EpisodeList from '@/components/EpisodeList';
import useSpotify from '@/hooks/useSpotify';

// TODO: 無限スクロールで全件取得する
const SavedEpisodes: NextApplicationPage = () => {
  const spotifyApi = useSpotify();

  const { data: episodes, isLoading } = useQuery(
    ['savedEpisodes'],
    async () => {
      const data = await spotifyApi.getMySavedEpisodes({ limit: 50 });
      return data.body.items.map(({ episode }) => episode);
    }
  );

  if (isLoading) return <p>Loading ...</p>;

  return episodes ? (
    episodes.length > 0 ? (
      <EpisodeList episodes={episodes} />
    ) : (
      <p>No saved episodes</p>
    )
  ) : null;
};

SavedEpisodes.requireAuth = true;

export default SavedEpisodes;
