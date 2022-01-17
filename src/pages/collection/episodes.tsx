import { useEffect, useState } from 'react';
import { NextApplicationPage } from '../_app';
import EpisodeList from '@/components/EpisodeList';
import useSpotify from '@/hooks/useSpotify';

// TODO: 無限スクロールで全件取得する
const SavedEpisodes: NextApplicationPage = () => {
  const spotifyApi = useSpotify();
  const [episodes, setEpisodes] = useState<SpotifyApi.EpisodeObject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await spotifyApi.getMySavedEpisodes({ limit: 50 });
      setEpisodes(data.body.items.map(({ episode }) => episode));
      setIsLoading(false);
    })();
  }, [spotifyApi]);

  if (isLoading) return <p>Loading ...</p>;

  return (
    <>
      {episodes.length > 0 ? (
        <EpisodeList episodes={episodes} />
      ) : (
        <p>No saved episodes</p>
      )}
    </>
  );
};

SavedEpisodes.requireAuth = true;

export default SavedEpisodes;
