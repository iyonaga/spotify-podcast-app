import ShowItem from './ShowItem';

interface Props {
  shows: SpotifyApi.ShowObjectSimplified[];
}

const ShowList: React.VFC<Props> = ({ shows }) => {
  return (
    <>
      {shows.map((show) => (
        <ShowItem key={show.id} show={show} />
      ))}
    </>
  );
};

export default ShowList;
