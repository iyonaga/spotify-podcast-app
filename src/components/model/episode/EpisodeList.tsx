import Item from './Item';

interface Props {
  episodes: SpotifyApi.EpisodeObjectSimplified[] | SpotifyApi.EpisodeObject[];
}

const EpisodeList: React.VFC<Props> = ({ episodes }) => {
  return (
    <ul>
      {episodes.map((episode) => (
        <li
          key={episode.id}
          className="relative before:absolute before:bottom-[-10px] my-[20px] first:mt-0 last:mb-0 before:w-full before:h-[1px] last:before:content-none before:bg-[#2A2839]"
        >
          <Item episode={episode} />
        </li>
      ))}
    </ul>
  );
};

export default EpisodeList;
