import Image from 'next/image';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroller';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import type { NextApplicationPage } from '../_app';
import EpisodeList from '@/components/EpisodeList';
import Heading from '@/components/Heading';
import useSpotify from '@/hooks/useSpotify';

const SingleShow: NextApplicationPage = () => {
  const spotifyApi = useSpotify();
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const fetchEpisodes = async ({ pageParam = 1 }) => {
    const limit = 50;
    const {
      body: { items, total },
    } = await spotifyApi.getShowEpisodes(id as string, {
      limit,
      offset: (pageParam - 1) * limit,
    });

    return {
      items,
      nextPage: pageParam + 1,
      totalPages: Math.ceil(total / limit),
    };
  };

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

  const {
    data: episodes,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ['showEpisodes', { id, enabled: !loadingShow }],
    fetchEpisodes,
    {
      enabled: !loadingShow,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage <= lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      },
      initialData: () => {
        if (!show) {
          return;
        }

        return {
          pages: [
            {
              items: show.episodes.items ?? [],
              nextPage: 2,
              totalPages: Math.ceil(show.episodes.total / show.episodes.limit),
            },
          ],
          pageParams: [1],
        };
      },
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
            className="mt-[22px] w-[160px] h-[40px] hover:bg-[#2a2838] rounded-[20px] border-[1px] border-white border-solid transition"
          >
            {isFollowing ? 'フォロー解除' : 'フォロー'}
          </button>
        </div>
      </div>
      <Heading tag="h2" variant="h1" className="mt-[40px] mb-[20px]">
        詳細情報
      </Heading>
      <p className="text-[16px]">{show.description}</p>
      <Heading tag="h2" variant="h1" className="mt-[50px] mb-[20px]">
        エピソード
      </Heading>
      <InfiniteScroll
        loader={<p key={0}>Loading...</p>}
        hasMore={hasNextPage}
        loadMore={() => fetchNextPage()}
      >
        <EpisodeList episodes={episodes!.pages.flatMap(({ items }) => items)} />
      </InfiniteScroll>
    </>
  ) : null;
};

SingleShow.requireAuth = true;

export default SingleShow;
