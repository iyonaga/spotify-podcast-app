import ShowCardPlaceholder from './CardPlaceholder';

interface Props {
  num?: number;
}

const ShowListPlaceholder: React.VFC<Props> = ({ num = 10 }) => (
  <div className="grid grid-cols-5 gap-[25px]">
    {Array.from({ length: num }).map((_, i) => (
      <ShowCardPlaceholder key={i} />
    ))}
  </div>
);

export default ShowListPlaceholder;
