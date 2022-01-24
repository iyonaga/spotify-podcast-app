import CalendarIcon from '@/components/icons/Calendar';
import ClockIcon from '@/components/icons/Clock';
import { millisToMinutes } from '@/lib/time';

interface Props {
  episode: SpotifyApi.EpisodeObjectSimplified;
}

const EpisodeInfo: React.VFC<Props> = ({ episode }) => {
  return (
    <div className="flex">
      <div className="flex items-center">
        <CalendarIcon height={15} />
        <p className="relative top-[1px] ml-[7px] text-[14px]">
          {episode.release_date}
        </p>
      </div>
      <div className="flex items-center ml-[15px]">
        <ClockIcon height={15} />
        <p className="relative top-[1px] ml-[7px] text-[14px]">
          {millisToMinutes(episode.duration_ms)}分
        </p>
      </div>
    </div>
  );
};

export default EpisodeInfo;
