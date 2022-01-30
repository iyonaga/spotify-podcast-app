import Image from 'next/image';
import EpisodeInfo from './EpisodeInfo';
import FavoriteIcon from '@/components/icons/Favorite';
import Heading from '@/components/ui/Heading';
import LinkButton from '@/components/ui/LinkButton';
import { useIsFavorite, useToggleFavorite } from '@/hooks/useEpisode';
import { useInfiniteShowEpisodes } from '@/hooks/useShow';

interface Props {
  episode: SpotifyApi.EpisodeObject;
}

const EpisodeDetail: React.VFC<Props> = ({ episode }) => {
  const { data: isFavorite, isLoading } = useIsFavorite(episode.id);
  const toggleFavorite = useToggleFavorite();

  return (
    <>
      <div className="flex gap-[37px]">
        <div className="flex-none">
          <Image
            src={episode.images[1].url}
            width={episode.images[1].width}
            height={episode.images[1].height}
            alt={episode.name}
            className="rounded-[9px]"
          />
        </div>
        <div>
          <h1 className="text-[32px] font-bold">{episode.name}</h1>
          <p className="mt-[5px] text-[20px] font-bold">{episode.show.name}</p>
          <div className="flex gap-[10px] mt-[22px]">
            <EpisodeInfo episode={episode} />
            {!isLoading && (
              <button
                className="ml-[7px] hover:opacity-70 transition"
                onClick={() => toggleFavorite(episode.id, isFavorite!)}
              >
                <FavoriteIcon height={15} fill={isFavorite ? 'white' : ''} />
              </button>
            )}
          </div>
          <div className="mt-[30px]">
            <LinkButton href={episode.external_urls.spotify} isExternal={true}>
              Spotifyで開く
            </LinkButton>
          </div>
        </div>
      </div>
      <Heading tag="h2" variant="h1" className="mt-[40px] mb-[30px]">
        エピソード内容
      </Heading>
      <p
        className="text-[16px]"
        dangerouslySetInnerHTML={{ __html: episode.html_description }}
      ></p>
      <div className="mt-[50px]">
        <LinkButton href={`/show/${episode.show.id}`}>
          すべてのエピソードを表示
        </LinkButton>
      </div>
    </>
  );
};

export default EpisodeDetail;
