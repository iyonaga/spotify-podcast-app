import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Auth from '@/components/Auth';

jest.mock('next/router');
jest.mock('next-auth/react');

const useRouterMocked = jest.mocked(useRouter);
const useSessionMocked = jest.mocked(useSession);
const pushMock = jest.fn();

describe('components/Auth.tsx', () => {
  beforeEach(() => {
    pushMock.mockClear();
    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);
  });
  test('ユーザがログインしていなければトップページへ遷移する', () => {
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated',
    });

    render(
      <Auth>
        <div>protected page.</div>
      </Auth>
    );

    expect(pushMock).toHaveBeenCalledWith('/signin');
  });

  test('ユーザがログインしていれば子要素を表示する', () => {
    useSessionMocked.mockReturnValueOnce({
      data: {
        accessToken: '',
        expires: '',
      },
      status: 'authenticated',
    });

    const container = render(
      <Auth>
        <div>protected page.</div>
      </Auth>
    );

    expect(pushMock).not.toHaveBeenCalled();
    expect(container.getByText('protected page.')).toBeInTheDocument();
  });
});
