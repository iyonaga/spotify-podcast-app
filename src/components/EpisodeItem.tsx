import Image from 'next/image';
import Link from 'next/link';

interface EpisodeItemProps {
  episode: SpotifyApi.EpisodeObjectSimplified | SpotifyApi.EpisodeObject;
}

const EpisodeItem = ({ episode }: EpisodeItemProps) => {
  return (
    <Link href={`/episode/${episode.id}`}>
      <a>
        <h1>{episode.name}</h1>
        <p>{episode.description}</p>
        <p>{episode.release_date}</p>
        <p>{episode.duration_ms}ms</p>
        <Image
          src={episode.images[1].url}
          width={episode.images[1].width}
          height={episode.images[1].height}
          alt={episode.name}
        />
      </a>
    </Link>
  );
};

export default EpisodeItem;
