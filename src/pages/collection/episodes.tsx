import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import { NextApplicationPage } from '../_app';
import EpisodeList from '@/components/EpisodeList';
import useSpotify from '@/hooks/useSpotify';

const SavedEpisodes: NextApplicationPage = () => {
  const spotifyApi = useSpotify();

  const fetchEpisodes = async ({ pageParam = 1 }) => {
    const limit = 10;
    const {
      body: { items, total },
    } = await spotifyApi.getMySavedEpisodes({
      limit,
      offset: (pageParam - 1) * limit,
    });

    return {
      items: items.map(({ episode }) => episode),
      nextPage: pageParam + 1,
      totalPages: Math.ceil(total / limit),
    };
  };

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['savedEpisodes'],
    fetchEpisodes,
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
      <h2 className="mb-[30px] heading">お気に入りのエピソード</h2>
      <InfiniteScroll
        loader={<p key={0}>Loading...</p>}
        hasMore={hasNextPage}
        loadMore={() => fetchNextPage()}
      >
        <EpisodeList episodes={data.pages.flatMap(({ items }) => items)} />
      </InfiniteScroll>
    </>
  ) : null;
};

SavedEpisodes.requireAuth = true;

export default SavedEpisodes;
