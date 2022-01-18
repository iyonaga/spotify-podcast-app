import SearchBar from './SearchBar';

interface Props {
  children: React.ReactNode;
}

const Layout: React.VFC<Props> = ({ children }) => {
  return (
    <div>
      <SearchBar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
