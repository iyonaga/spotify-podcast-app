import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import type { NextApplicationPage } from '../_app';
import CalendarIcon from '@/components/icons/Calendar';
import ClockIcon from '@/components/icons/Clock';
import FavoriteIcon from '@/components/icons/Favorite';
import Heading from '@/components/ui/Heading';
import LinkButton from '@/components/ui/LinkButton';
import useSpotify from '@/hooks/useSpotify';
import { millisToMinutes } from '@/lib/time';

const SingleEpisode: NextApplicationPage = () => {
  const spotifyApi = useSpotify();
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const { data: episode, isLoading: loadingEpisode } = useQuery(
    ['singleEpisode', { id }],
    async () => {
      const data = await spotifyApi.getEpisode(id as string);
      return data.body;
    }
  );

  const { data: isFavorite, isLoading: loadingIsFavorite } = useQuery(
    ['isFavorite', { id }],
    async () => {
      const data = await spotifyApi.containsMySavedEpisodes([id as string]);
      return data.body[0];
    }
  );

  const isLoading = loadingEpisode && loadingIsFavorite;

  const addToMySavedEpisodes = useMutation((id: string) =>
    spotifyApi.addToMySavedEpisodes([id])
  );

  const removeFromMySavedEpisodes = useMutation((id: string) =>
    spotifyApi.removeFromMySavedEpisodes([id])
  );

  const toggleFavorite = async (id: string) => {
    if (isFavorite) {
      await removeFromMySavedEpisodes.mutateAsync(id);
    } else {
      await addToMySavedEpisodes.mutateAsync(id);
    }

    queryClient.setQueryData(['isFavorite', { id }], !isFavorite);
  };

  if (isLoading) return <p>Loading ...</p>;

  return episode ? (
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
            <div className="flex items-center">
              <CalendarIcon height={15} />
              <p className="relative top-[1px] ml-[7px] text-[14px]">
                {episode.release_date}
              </p>
            </div>
            <div className="flex items-center ml-[15px]">
              <ClockIcon height={15} />
              <p className="relative top-[1px] ml-[7px] text-[14px]">
                {millisToMinutes(episode.duration_ms)}分
              </p>
            </div>
            <button
              className="ml-[7px] hover:opacity-70 transition"
              onClick={() => toggleFavorite(episode.id)}
            >
              <FavoriteIcon height={15} fill={isFavorite ? 'white' : ''} />
            </button>
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
  ) : null;
};

SingleEpisode.requireAuth = true;

export default SingleEpisode;
