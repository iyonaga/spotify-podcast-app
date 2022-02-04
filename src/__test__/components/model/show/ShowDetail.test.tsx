import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSession } from 'next-auth/react';
import React, { ReactNode } from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import ShowDetail from '@/components/model/show/ShowDetail';
import * as hooks from '@/hooks/useShow';
import { spotifyApi } from '@/lib/spotify';
import { ShowObjectMock } from '@/mocks/showsMock';

jest.mock('next-auth/react');
const useSessionMocked = jest.mocked(useSession);
useSessionMocked.mockReturnValue({
  data: {
    accessToken: 'accessToken',
    expires: '',
  },
  status: 'authenticated',
});

const containsMySavedShowsMocked = jest.spyOn(
  spotifyApi,
  'containsMySavedShows'
);

const queryCache = new QueryCache();
const queryClient = new QueryClient({
  queryCache,
});

const Wrapper: React.VFC<{ children: ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('components/model/show/ShowDetail.tsx', () => {
  beforeEach(() => {
    queryCache.clear();
  });

  // test('番組詳細がレンダリングされる', async () => {
  //   containsMySavedShowsMocked.mockResolvedValue({
  //     body: [true],
  //     headers: {},
  //     statusCode: 200,
  //   });
  //   render(
  //     <Wrapper>
  //       <ShowDetail show={ShowObjectMock} />
  //     </Wrapper>
  //   );
  //   expect(screen.queryByRole('button')).not.toBeInTheDocument();
  // });

  test('フォロー中の場合はボタンのテキストが「フォロー解除」になる', async () => {
    containsMySavedShowsMocked.mockResolvedValue({
      body: [true],
      headers: {},
      statusCode: 200,
    });
    render(
      <Wrapper>
        <ShowDetail show={ShowObjectMock} />
      </Wrapper>
    );
    const button = await screen.findByRole('button');
    expect(button).toHaveTextContent(/^フォロー解除$/);
  });

  test('フォローしていない場合はボタンのテキストが「フォロー」になる', async () => {
    containsMySavedShowsMocked.mockResolvedValue({
      body: [false],
      headers: {},
      statusCode: 200,
    });
    render(
      <Wrapper>
        <ShowDetail show={ShowObjectMock} />
      </Wrapper>
    );
    const button = await screen.findByRole('button');
    expect(button).toHaveTextContent(/^フォロー$/);
  });

  test('ボタンをクリックするとtoggleFollow()が呼ばれる', async () => {
    const useToggleFollowMocked = jest.spyOn(hooks, 'useToggleFollow');
    const toggleFollowMock = jest.fn();
    useToggleFollowMocked.mockImplementation(() => {
      return toggleFollowMock;
    });
    const isFollowing = true;
    containsMySavedShowsMocked.mockResolvedValue({
      body: [isFollowing],
      headers: {},
      statusCode: 200,
    });
    render(
      <Wrapper>
        <ShowDetail show={ShowObjectMock} />
      </Wrapper>
    );
    const button = await screen.findByRole('button');
    userEvent.click(button);
    expect(toggleFollowMock).toHaveBeenCalledWith(
      ShowObjectMock.id,
      isFollowing
    );
  });
});
