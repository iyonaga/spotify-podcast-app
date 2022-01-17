import EpisodeItem from './EpisodeItem';

interface EpisodeListProps {
  episodes: SpotifyApi.EpisodeObjectSimplified[];
}

const EpisodeList = ({ episodes }: EpisodeListProps) => {
  return (
    <>
      {episodes.map((episode) => (
        <EpisodeItem key={episode.id} episode={episode} />
      ))}
    </>
  );
};

export default EpisodeList;
