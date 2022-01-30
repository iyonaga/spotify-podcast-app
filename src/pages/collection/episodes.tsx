import InfiniteScroll from 'react-infinite-scroller';
import { NextApplicationPage } from '../_app';
import EpisodeList from '@/components/model/episode/EpisodeList';
import EpisodeListPlaceholder from '@/components/model/episode/EpisodeListPlaceholder';
import Heading from '@/components/ui/Heading';
import Spinner from '@/components/ui/Spinner';
import { useInfiniteSavedEpisodes } from '@/hooks/useEpisode';

const SavedEpisodes: NextApplicationPage = () => {
  const { data, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteSavedEpisodes();

  const hasEpisodes = ({ pages }: Exclude<typeof data, undefined>) => {
    return pages.some((page) => page.items.length > 0);
  };

  return (
    <>
      <Heading className="mb-[20px]">お気に入りのエピソード</Heading>
      {isLoading && <EpisodeListPlaceholder />}
      {data &&
        (hasEpisodes(data) ? (
          <InfiniteScroll
            loader={<Spinner key={0} className="mt-[25px]" />}
            hasMore={hasNextPage}
            loadMore={() => fetchNextPage()}
          >
            <EpisodeList episodes={data.pages.flatMap(({ items }) => items)} />
          </InfiniteScroll>
        ) : (
          <p>お気に入りのエピソードはありません</p>
        ))}
    </>
  );
};

SavedEpisodes.requireAuth = true;

export default SavedEpisodes;
