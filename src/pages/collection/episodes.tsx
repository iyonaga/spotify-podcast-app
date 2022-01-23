import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import { NextApplicationPage } from '../_app';
import EpisodeList from '@/components/model/episode/EpisodeList';
import Heading from '@/components/ui/Heading';
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
      <Heading className="mb-[20px]">お気に入りのエピソード</Heading>
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
