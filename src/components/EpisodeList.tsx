import EpisodeItem from './EpisodeItem';

interface EpisodeListProps {
  episodes: SpotifyApi.EpisodeObjectSimplified[] | SpotifyApi.EpisodeObject[];
  displayShowName?: boolean;
}

const EpisodeList = ({ episodes, ...props }: EpisodeListProps) => {
  return (
    <ul className="">
      {episodes.map((episode) => (
        <li
          key={episode.id}
          className="relative before:absolute before:bottom-[-25px] my-[50px] first:mt-0 last:mb-0 before:w-full before:h-[1px] last:before:content-none before:bg-[#2A2839]"
        >
          <EpisodeItem episode={episode} {...props} />
        </li>
      ))}
    </ul>
  );
};

export default EpisodeList;
