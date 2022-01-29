import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LinkButton from '../../ui/LinkButton';
import EpisodeInfo from './EpisodeInfo';

interface Props {
  episode: SpotifyApi.EpisodeObjectSimplified | SpotifyApi.EpisodeObject;
}

const Item: React.VFC<Props> = ({ episode }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push(`/episode/${episode.id}`);
  };

  return (
    <div className="p-[15px] w-full hover:bg-[#2a2838] rounded-[5px] transition cursor-pointer">
      <div onClick={handleClick} className="flex gap-[20px]">
        <div className="flex-none w-[125px]">
          <Image
            className="rounded-[9px]"
            src={episode.images[1].url}
            width={episode.images[1].width}
            height={episode.images[1].height}
            alt={episode.name}
            layout="responsive"
          />
        </div>
        <div className="flex overflow-hidden relative flex-col justify-between mt-[3px] w-full">
          <div>
            <Link href={`/episode/${episode.id}`}>
              <a className="inline-block">
                <h3 className="text-[16px] font-bold">{episode.name}</h3>
              </a>
            </Link>
            <div className="mt-[8px] text-[14px] truncate">
              {episode.description}
            </div>
          </div>
          <div className="mt-[10px]">
            {'show' in episode && (
              <Link href={`/show/${episode.show.id}`}>
                <a className="text-[14px] font-bold">{episode.show.name}</a>
              </Link>
            )}
            <div className="mt-[3px]">
              <EpisodeInfo episode={episode} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-[15px] bottom-[15px]">
        <LinkButton href={episode.external_urls.spotify} isExternal={true}>
          Spotifyで開く
        </LinkButton>
      </div>
    </div>
  );
};

export default Item;
