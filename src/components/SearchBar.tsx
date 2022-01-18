import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
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
    <input
      className="text-black"
      type="text"
      placeholder="Search"
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      defaultValue={query}
    />
  );
};

export default SearchBar;
