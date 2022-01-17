import Image from 'next/image';
import Link from 'next/link';

interface Props {
  show: SpotifyApi.ShowObjectSimplified;
}

const ShowItem: React.VFC<Props> = ({ show }) => {
  return (
    <Link href={`/show/${show.id}`}>
      <a>
        <h2>{show.name}</h2>
        <p>{show.publisher}</p>
        <Image
          src={show.images[1].url}
          width={show.images[1].width}
          height={show.images[1].height}
          alt={show.name}
        />
      </a>
    </Link>
  );
};

export default ShowItem;
