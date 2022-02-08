import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { useSession } from 'next-auth/react';
import React, { ReactNode } from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import EpisodeDetail from '@/components/model/episode/EpisodeDetail';
import { ENDPOINTS } from '@/mocks/constants';
import { episodeObjectMock } from '@/mocks/data/episodes';
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

describe('components/model/episode/EpisodeDetail.tsx', () => {
  beforeEach(() => {
    queryCache.clear();
  });

  test('お気に入りエピソードの場合はアイコンの塗りが白になる', async () => {
    server.use(
      rest.get(ENDPOINTS.CHECK_SAVED_EPISODES, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([true]));
      })
    );

    render(
      <Wrapper>
        <EpisodeDetail episode={episodeObjectMock} />
      </Wrapper>
    );

    const button = await screen.findByRole('button');
    const icon = button.querySelector('svg');
    expect(icon).toHaveAttribute('fill', 'white');
  });

  test('お気に入りエピソードでない場合はアイコンの塗りが設定されない', async () => {
    server.use(
      rest.get(ENDPOINTS.CHECK_SAVED_EPISODES, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([false]));
      })
    );

    render(
      <Wrapper>
        <EpisodeDetail episode={episodeObjectMock} />
      </Wrapper>
    );

    const button = await screen.findByRole('button');
    const icon = button.querySelector('svg');
    expect(icon).toHaveAttribute('fill', '');
  });

  test('ボタンをクリックするとアイコンの塗りが切り替わる', async () => {
    server.use(
      rest.get(ENDPOINTS.CHECK_SAVED_EPISODES, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([true]));
      })
    );

    render(
      <Wrapper>
        <EpisodeDetail episode={episodeObjectMock} />
      </Wrapper>
    );

    const button = await screen.findByRole('button');
    const icon = button.querySelector('svg');

    server.use(
      rest.get(ENDPOINTS.CHECK_SAVED_EPISODES, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([false]));
      })
    );

    userEvent.click(button);
    await waitFor(() => expect(icon).toHaveAttribute('fill', ''));
  });
});
