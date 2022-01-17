import { useEffect, useState } from 'react';
import { NextApplicationPage } from '../_app';
import ShowItem from '@/components/ShowItem';
import ShowList from '@/components/ShowList';
import useSpotify from '@/hooks/useSpotify';

// TODO: 無限スクロールで全件取得する
const SavedShows: NextApplicationPage = () => {
  const spotifyApi = useSpotify();
  const [shows, setShows] = useState<SpotifyApi.ShowObjectSimplified[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await spotifyApi.getMySavedShows({ limit: 50 });
      setShows(data.body.items.map(({ show }) => show));
      setIsLoading(false);
    })();
  }, [spotifyApi]);

  if (isLoading) return <p>Loading ...</p>;

  return (
    <>{shows.length > 0 ? <ShowList shows={shows} /> : <p>No saved shows</p>}</>
  );
};

SavedShows.requireAuth = true;

export default SavedShows;
