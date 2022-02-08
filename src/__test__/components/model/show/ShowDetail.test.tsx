import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { useSession } from 'next-auth/react';
import React, { ReactNode } from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import ShowDetail from '@/components/model/show/ShowDetail';
import { ENDPOINTS } from '@/mocks/constants';
import { showObjectMock } from '@/mocks/data/shows';
import { server } from '@/mocks/server';

jest.mock('next-auth/react');
const useSessionMocked = jest.mocked(useSession);
useSessionMocked.mockReturnValue({
  data: {
    accessToken: 'accessToken',
    expires: '',
  },
  status: 'authenticated',
});

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
  //   render(
  //     <Wrapper>
  //       <ShowDetail show={ShowObjectMock} />
  //     </Wrapper>
  //   );
  //   expect(screen.queryByRole('button')).not.toBeInTheDocument();
  // });

  test('フォロー中の場合はボタンのテキストが「フォロー解除」になる', async () => {
    server.use(
      rest.get(ENDPOINTS.CHECK_SAVED_SHOWS, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([true]));
      })
    );

    render(
      <Wrapper>
        <ShowDetail show={showObjectMock} />
      </Wrapper>
    );
    const button = await screen.findByRole('button');
    expect(button).toHaveTextContent(/^フォロー解除$/);
  });

  test('フォローしていない場合はボタンのテキストが「フォロー」になる', async () => {
    server.use(
      rest.get(ENDPOINTS.CHECK_SAVED_SHOWS, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([false]));
      })
    );

    render(
      <Wrapper>
        <ShowDetail show={showObjectMock} />
      </Wrapper>
    );
    const button = await screen.findByRole('button');
    expect(button).toHaveTextContent(/^フォロー$/);
  });

  test('ボタンをクリックするとテキストが切り替わる', async () => {
    render(
      <Wrapper>
        <ShowDetail show={showObjectMock} />
      </Wrapper>
    );
    const button = await screen.findByRole('button');

    server.use(
      rest.get(ENDPOINTS.CHECK_SAVED_SHOWS, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([false]));
      })
    );

    userEvent.click(button);
    await waitFor(() => expect(button).toHaveTextContent(/^フォロー$/));

    server.use(
      rest.get(ENDPOINTS.CHECK_SAVED_SHOWS, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([true]));
      })
    );

    userEvent.click(button);
    await waitFor(() => expect(button).toHaveTextContent(/^フォロー解除$/));
  });
});
