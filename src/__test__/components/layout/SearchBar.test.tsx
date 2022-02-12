import { act, render } from '@testing-library/react';
import { useRouter } from 'next/router';
import SearchBar from '@/components/layout/SearchBar';
import useSearch from '@/hooks/useSearch';

jest.mock('@/hooks/useSearch');
const useSearchMocked = jest.mocked(useSearch);

jest.mock('next/router');
const useRouterMocked = jest.mocked(useRouter);

describe('components/layout/SearchBar.tsx', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    useSearchMocked.mockImplementation(() => ({
      handleChange: jest.fn(),
      handleKeyPress: jest.fn(),
      handleSearch: jest.fn(),
      searchInput: '',
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('検索結果ページにいる場合はインクリメンタルサーチが実行される', () => {
    useRouterMocked.mockReturnValue({
      pathname: '/search',
    } as any);

    const { rerender } = render(<SearchBar />);

    const handleSearchMock = jest.fn();
    useSearchMocked.mockImplementation(() => ({
      handleChange: jest.fn(),
      handleKeyPress: jest.fn(),
      handleSearch: handleSearchMock,
      searchInput: 'a',
    }));

    rerender(<SearchBar />);

    expect(handleSearchMock).not.toHaveBeenCalled();

    act(() => {
      jest.runAllTimers();
    });

    expect(handleSearchMock).toHaveBeenCalledWith('a');
  });

  test('検索結果ページにいない場合はインクリメンタルサーチが実行されない', () => {
    useRouterMocked.mockReturnValue({
      pathname: '/',
    } as any);

    const { rerender } = render(<SearchBar />);

    const handleSearchMock = jest.fn();
    useSearchMocked.mockImplementation(() => ({
      handleChange: jest.fn(),
      handleKeyPress: jest.fn(),
      handleSearch: handleSearchMock,
      searchInput: 'a',
    }));

    rerender(<SearchBar />);

    act(() => {
      jest.runAllTimers();
    });

    expect(handleSearchMock).not.toHaveBeenCalled();
  });
});
