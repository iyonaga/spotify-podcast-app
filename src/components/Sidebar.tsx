import clsx from 'clsx';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import FavoriteIcon from './Icons/Favorite';
import HomeIcon from './Icons/Home';
import PodcastIcon from './Icons/Podcast';

const menus = [
  {
    title: 'ホーム',
    href: '/',
    icon: <HomeIcon />,
  },
  {
    title: 'ポッドキャスト',
    href: '/collection/shows',
    icon: <PodcastIcon />,
  },
  {
    title: 'お気に入りのエピソード',
    href: '/collection/episodes',
    icon: <FavoriteIcon fill="white" />,
  },
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="sticky top-0 left-0 flex-none w-[250px] h-screen bg-[#2D2E39]">
      <div className="flex flex-col justify-between px-[20px] h-full">
        <ul className="mt-[30px]">
          {menus.map(({ title, href, icon }) => (
            <li key={title} className="mb-[20px]">
              <Link href={href}>
                <a
                  className={clsx(
                    'flex items-center opacity-60 hover:opacity-100 transition',
                    router.pathname === href && 'opacity-100'
                  )}
                >
                  <span className="flex relative">{icon}</span>
                  <span className="ml-[10px] text-[16px] font-bold">
                    {title}
                  </span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mb-[40px]">
          <button
            className="block m-auto w-[160px] h-[40px] text-[17px] font-bold text-black bg-white hover:bg-white/80 rounded-[30px] transition duration-500"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
