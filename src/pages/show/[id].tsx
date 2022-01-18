import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import type { NextApplicationPage } from '../_app';
import EpisodeList from '@/components/EpisodeList';
import useSpotify from '@/hooks/useSpotify';

const SingleShow: NextApplicationPage = () => {
  const spotifyApi = useSpotify();
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const { data: show, isLoading: loadingShow } = useQuery(
    ['singleShow', { id }],
    async () => {
      const data = await spotifyApi.getShow(id as string);
      return data.body;
    }
  );

  const { data: isFollowing, isLoading: loadingIsFavorite } = useQuery(
    ['isFollowing', { id }],
    async () => {
      const data = await spotifyApi.containsMySavedShows([id as string]);
      return data.body[0];
    }
  );

  const isLoading = loadingShow && loadingIsFavorite;

  const addToMySavedShows = useMutation((id: string) =>
    spotifyApi.addToMySavedShows([id])
  );

  const removeFromMySavedShows = useMutation((id: string) =>
    spotifyApi.removeFromMySavedShows([id])
  );

  const toggleFollow = async (id: string) => {
    if (isFollowing) {
      await removeFromMySavedShows.mutateAsync(id);
    } else {
      await addToMySavedShows.mutateAsync(id);
    }

    queryClient.setQueriesData(['isFollowing', { id }], !isFollowing);
  };

  if (isLoading) return <p>Loading ...</p>;

  return show ? (
    <>
      <div className="flex gap-[37px]">
        <div className="flex-none">
          <Image
            src={show.images[1].url}
            width={show.images[1].width}
            height={show.images[1].height}
            alt={show.name}
            className="rounded-[9px]"
          />
        </div>
        <div>
          <h1 className="text-[32px] font-bold">{show.name}</h1>
          <p className="mt-[5px] text-[20px] font-bold">{show.publisher}</p>
          <button
            onClick={() => toggleFollow(show.id)}
            className="mt-[22px] w-[160px] h-[40px] rounded-[20px] border-[1px] border-white border-solid"
          >
            {isFollowing ? 'フォロー解除' : 'フォロー'}
          </button>
        </div>
      </div>
      <h2 className="mt-[40px] mb-[20px] heading">詳細情報</h2>
      <p className="text-[16px]">{show.description}</p>
      <h2 className="mt-[50px] mb-[30px] heading">エピソード</h2>
      <EpisodeList episodes={show.episodes.items} />
    </>
  ) : null;
};

SingleShow.requireAuth = true;

export default SingleShow;
