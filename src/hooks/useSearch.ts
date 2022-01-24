import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { queryState } from '@/states/searchState';

const useSearch = () => {
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

  return {
    handleChange,
    handleKeyPress,
    query,
  };
};

export default useSearch;
