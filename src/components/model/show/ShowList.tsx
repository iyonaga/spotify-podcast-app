import ShowItem from './ShowItem';

interface Props {
  shows: SpotifyApi.ShowObjectSimplified[];
}

const ShowList: React.VFC<Props> = ({ shows }) => {
  return (
    <div className="grid grid-cols-5 gap-[25px]">
      {shows.map((show) => (
        <div key={show.id} className="flex">
          <ShowItem show={show} />
        </div>
      ))}
    </div>
  );
};

export default ShowList;
