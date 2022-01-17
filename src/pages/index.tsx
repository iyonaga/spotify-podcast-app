import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { NextApplicationPage } from './_app';
import useSpotify from '@/hooks/useSpotify';

const Home: NextApplicationPage = () => {
  const spotifyApi = useSpotify();
  const [shows, setShows] = useState<SpotifyApi.SavedShowObject[]>([]);
  const [episodes, setEpisodes] = useState<SpotifyApi.SavedEpisodeObject[]>([]);

  useEffect(() => {
    const getSavedShows = async () => {
      const shows = await spotifyApi.getMySavedShows({ limit: 5 });
      setShows(shows.body.items);
    };

    const getSavedEpisodes = async () => {
      const episodes = await spotifyApi.getMySavedEpisodes({ limit: 5 });
      setEpisodes(episodes.body.items);
    };

    getSavedShows();
    getSavedEpisodes();
  }, [spotifyApi]);

  return (
    <>
      <button onClick={() => signOut()}>Sign out</button>
      <hr />
      {shows.map(({ show }) => (
        <div key={show.id}>
          <h2>{show.name}</h2>
          <p>{show.publisher}</p>
          <Image
            src={show.images[1].url}
            width={show.images[1].width}
            height={show.images[1].height}
            alt={show.name}
          />
        </div>
      ))}
      <hr />
      {episodes.map(({ episode }) => (
        <div key={episode.id}>
          <h2>{episode.name}</h2>
          <p>{episode.description}</p>
          <Image
            src={episode.images[1].url}
            width={episode.images[1].width}
            height={episode.images[1].height}
            alt={episode.name}
          />
        </div>
      ))}
    </>
  );
};

Home.requireAuth = true;

export default Home;
