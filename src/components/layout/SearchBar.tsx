import SearchInput from '../ui/SearchInput';
import useSearch from '@/hooks/useSearch';

const SearchBar = () => {
  const { handleChange, handleKeyPress, query } = useSearch();

  return (
    <div className="mt-[30px] w-full">
      <div className="w-[480px]">
        <SearchInput
          handleChange={handleChange}
          handleKeyPress={handleKeyPress}
          query={query}
        />
      </div>
    </div>
  );
};

export default SearchBar;
