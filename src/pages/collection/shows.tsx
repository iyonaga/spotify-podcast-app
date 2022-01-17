import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { NextApplicationPage } from '../_app';
import ShowItem from '@/components/ShowItem';
import ShowList from '@/components/ShowList';
import useSpotify from '@/hooks/useSpotify';

// TODO: 無限スクロールで全件取得する
const SavedShows: NextApplicationPage = () => {
  const spotifyApi = useSpotify();

  const { data: shows, isLoading } = useQuery(['savedShows'], async () => {
    const data = await spotifyApi.getMySavedShows({ limit: 50 });
    return data.body.items.map(({ show }) => show);
  });

  if (isLoading) return <p>Loading ...</p>;

  return shows ? (
    shows.length > 0 ? (
      <ShowList shows={shows} />
    ) : (
      <p>No saved shows</p>
    )
  ) : null;
};

SavedShows.requireAuth = true;

export default SavedShows;
