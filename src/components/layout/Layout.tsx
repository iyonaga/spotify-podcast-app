import SearchBar from './SearchBar';
import Sidebar from './Sidebar';

interface Props {
  children: React.ReactNode;
}

const Layout: React.VFC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="px-[45px] pb-[40px] w-[calc(100%-250px)]">
        <SearchBar />
        <main className="mt-[40px]">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
