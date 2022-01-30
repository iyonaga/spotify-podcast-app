import { useRouter } from 'next/router';
import type { NextApplicationPage } from '../_app';
import ShowDetail from '@/components/model/show/ShowDetail';
import ShowDetailPlaceholder from '@/components/model/show/ShowDetailPlaceholder';
import { useGetShow } from '@/hooks/useShow';

const SingleShow: NextApplicationPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: show, isLoading } = useGetShow(id as string);

  if (isLoading) return <ShowDetailPlaceholder />;
  return show ? <ShowDetail show={show} /> : null;
};

SingleShow.requireAuth = true;

export default SingleShow;
