import ItemPlaceholder from './ItemPlaceholder';

interface Props {
  num?: number;
}

const EpisodeListPlaceholder: React.VFC<Props> = ({ num = 10 }) => (
  <div className="">
    {Array.from({ length: num }).map((_, i) => (
      <div
        key={i}
        className="relative before:absolute before:bottom-[-10px] my-[20px] first:mt-0 last:mb-0 before:w-full before:h-[1px] last:before:content-none before:bg-[#2A2839]"
      >
        <ItemPlaceholder />
      </div>
    ))}
  </div>
);

export default EpisodeListPlaceholder;
