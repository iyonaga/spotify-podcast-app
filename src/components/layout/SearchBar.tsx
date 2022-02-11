import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SearchInput from '../ui/SearchInput';
import { useDebounce } from '@/hooks/useDebounce';
import useSearch from '@/hooks/useSearch';

const SearchBar = () => {
  const router = useRouter();
  const { handleChange, handleKeyPress, searchInput, handleSearch } =
    useSearch();
  const debouncedSearchInput = useDebounce(searchInput, 500);

  useEffect(() => {
    if (router.pathname === '/search') {
      handleSearch(debouncedSearchInput);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchInput]);

  return (
    <div className="mt-[30px] w-full">
      <div className="w-[480px]">
        <SearchInput
          handleChange={handleChange}
          handleKeyPress={handleKeyPress}
          searchInput={searchInput}
        />
      </div>
    </div>
  );
};

export default SearchBar;
