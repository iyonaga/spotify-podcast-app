import InfiniteScroll from 'react-infinite-scroller';
import { NextApplicationPage } from '../_app';
import ShowList from '@/components/model/show/ShowList';
import ShowListPlaceholder from '@/components/model/show/ShowListPlaceholder';
import Heading from '@/components/ui/Heading';
import Spinner from '@/components/ui/Spinner';
import { useInfiniteSavedShows } from '@/hooks/useShow';

const SavedShows: NextApplicationPage = () => {
  const { data, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteSavedShows();

  const hasShows = ({ pages }: Exclude<typeof data, undefined>) => {
    return pages.some((page) => page.items.length > 0);
  };

  return (
    <>
      <Heading className="mb-[30px]">ポッドキャスト</Heading>
      {isLoading && <ShowListPlaceholder />}
      {data &&
        (hasShows(data) ? (
          <InfiniteScroll
            loader={<Spinner key={0} className="mt-[25px]" />}
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
