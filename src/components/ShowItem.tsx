import Image from 'next/image';
import Link from 'next/link';

interface Props {
  show: SpotifyApi.ShowObjectSimplified;
}

const ShowItem: React.VFC<Props> = ({ show }) => {
  return (
    <div className="w-full bg-[#2A2839] rounded-[5px]">
      <Link href={`/show/${show.id}`}>
        <a className="flex flex-col p-[15px] h-full">
          <Image
            className="rounded-[9px]"
            src={show.images[1].url}
            width={show.images[1].width}
            height={show.images[1].height}
            alt={show.name}
            layout="responsive"
          />
          <p className="mt-[9px] text-[16px] font-bold">{show.name}</p>
          <p className="mt-[6px] text-[13px]">{show.publisher}</p>
        </a>
      </Link>
    </div>
  );
};

export default ShowItem;
