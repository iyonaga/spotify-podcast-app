import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import SearchIcon from '../icons/Search';
import { queryState } from '@/states/searchState';

const SearchBar = () => {
  const router = useRouter();
  const [text, setText] = useState('');
  const query = useRecoilValue(queryState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      router.push(`/search?keyword=${text}`);
    }
  };

  return (
    <div className="mt-[30px] w-full">
      <div className="group relative w-[480px]">
        <div className="absolute top-[15px] left-[23px]">
          <SearchIcon className="fill-gray group-focus-within:fill-white" />
        </div>
        <input
          className="px-[55px] w-full h-[50px] text-white bg-transparent rounded-[25px] border-2 border-gray focus:border-white border-solid outline-none"
          type="text"
          placeholder="Search"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          defaultValue={query}
        />
      </div>
    </div>
  );
};

export default SearchBar;
