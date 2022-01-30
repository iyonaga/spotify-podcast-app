import { useRouter } from 'next/router';
import type { NextApplicationPage } from '../_app';
import EpisodeDetail from '@/components/model/episode/EpisodeDetail';
import EpisodeDetailPlaceholder from '@/components/model/episode/EpisodeDetailPlaceholder';
import { useGetEpisode } from '@/hooks/useEpisode';

const SingleEpisode: NextApplicationPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: episode, isLoading } = useGetEpisode(id as string);

  if (isLoading) return <EpisodeDetailPlaceholder />;
  return episode ? <EpisodeDetail episode={episode} /> : null;
};

SingleEpisode.requireAuth = true;

export default SingleEpisode;
