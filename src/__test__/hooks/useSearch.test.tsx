import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import useSearch, { useGetSearchResult } from '@/hooks/useSearch';
import { searchResponseMock } from '@/mocks/data/search';

jest.mock('next/router');
jest.mock('next-auth/react');
const useSessionMocked = jest.mocked(useSession);

useSessionMocked.mockReturnValue({
  data: {
    accessToken: 'accessToken',
    expires: '',
  },
  status: 'authenticated',
});

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </RecoilRoot>
);

describe('hooks/useSearch.tsx', () => {
  test('useSearch', async () => {
    const useRouterMocked = jest.mocked(useRouter);
    const pushMock = jest.fn();
    useRouterMocked.mockReturnValue({
      push: pushMock,
    } as any);

    const { result } = renderHook(() => useSearch(), {
      wrapper,
    });

    act(() => {
      result.current.handleChange({
        target: {
          value: 'text',
        },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    result.current.handleKeyPress({
      key: 'Enter',
      preventDefault: jest.fn(),
    } as any as React.KeyboardEvent<HTMLInputElement>);

    expect(pushMock).toHaveBeenCalledWith(`/search?keyword=text`);
  });

  test('useGetSearchResult', async () => {
    const { result, waitFor } = renderHook(() => useGetSearchResult('query'), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toEqual(searchResponseMock);
  });
});
