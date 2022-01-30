import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroller';
import EpisodeList from '../episode/EpisodeList';
import EpisodeListPlaceholder from '../episode/EpisodeListPlaceholder';
import Heading from '@/components/ui/Heading';
import Spinner from '@/components/ui/Spinner';
import {
  useInfiniteShowEpisodes,
  useIsFollowing,
  useToggleFollow,
} from '@/hooks/useShow';

interface Props {
  show: SpotifyApi.ShowObject;
}

const ShowDetail: React.VFC<Props> = ({ show }) => {
  const { data: isFollowing, isLoading } = useIsFollowing(show.id);
  const toggleFollow = useToggleFollow();
  const {
    data: episodes,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteShowEpisodes(show.id, {
    initialData: {
      pages: [
        {
          items: show.episodes.items ?? [],
          nextPage: 2,
          totalPages: Math.ceil(show.episodes.total / show.episodes.limit),
        },
      ],
      pageParams: [1],
    },
  });

  return (
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
          {!isLoading && (
            <button
              onClick={() => toggleFollow(show.id, isFollowing!)}
              className="mt-[22px] w-[160px] h-[40px] hover:bg-[#2a2838] rounded-[20px] border-[1px] border-white border-solid transition"
            >
              {isFollowing ? 'フォロー解除' : 'フォロー'}
            </button>
          )}
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
        loader={<Spinner key={0} className="mt-[25px]" />}
        hasMore={hasNextPage}
        loadMore={() => fetchNextPage()}
      >
        <EpisodeList episodes={episodes!.pages.flatMap(({ items }) => items)} />
      </InfiniteScroll>
    </>
  );
};

export default ShowDetail;
