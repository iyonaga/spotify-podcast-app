import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import { NextApplicationPage } from '../_app';
import ShowList from '@/components/model/show/ShowList';
import ShowListPlaceholder from '@/components/model/show/ShowListPlaceholder';
import Heading from '@/components/ui/Heading';
import useSpotify from '@/hooks/useSpotify';

const SavedShows: NextApplicationPage = () => {
  const spotifyApi = useSpotify();

  const fetchShows = async ({ pageParam = 1 }) => {
    const limit = 10;
    const {
      body: { items, total },
    } = await spotifyApi.getMySavedShows({
      limit,
      offset: (pageParam - 1) * limit,
    });

    return {
      items: items.map(({ show }) => show),
      nextPage: pageParam + 1,
      totalPages: Math.ceil(total / limit),
    };
  };

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['savedShows'],
    fetchShows,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage <= lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      },
    }
  );

  const hasShows = ({ pages }: Exclude<typeof data, undefined>) => {
    console.log(pages.some((page) => page.items.length > 0));
    return pages.some((page) => page.items.length > 0);
  };

  return (
    <>
      <Heading className="mb-[30px]">ポッドキャスト</Heading>
      {isLoading && <ShowListPlaceholder />}
      {data &&
        (hasShows(data) ? (
          <InfiniteScroll
            loader={<p key={0}>Loading...</p>}
            hasMore={hasNextPage}
            loadMore={() => fetchNextPage()}
          >
            <ShowList shows={data.pages.flatMap(({ items }) => items)} />
          </InfiniteScroll>
        ) : (
          <p>フォロー中の番組はありません</p>
        ))}
    </>
  );
};

SavedShows.requireAuth = true;

export default SavedShows;
