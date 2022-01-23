import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import { NextApplicationPage } from '../_app';
import Heading from '@/components/Heading';
import ShowList from '@/components/ShowList';
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

  if (isLoading) return <p>Loading ...</p>;

  return data ? (
    <>
      <Heading className="mb-[30px]">ポッドキャスト</Heading>
      <InfiniteScroll
        loader={<p key={0}>Loading...</p>}
        hasMore={hasNextPage}
        loadMore={() => fetchNextPage()}
      >
        <ShowList shows={data.pages.flatMap(({ items }) => items)} />
      </InfiniteScroll>
    </>
  ) : null;
};

SavedShows.requireAuth = true;

export default SavedShows;
