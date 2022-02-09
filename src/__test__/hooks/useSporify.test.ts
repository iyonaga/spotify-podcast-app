import { renderHook } from '@testing-library/react-hooks';
import { useSession } from 'next-auth/react';
import useSpotify from '@/hooks/useSpotify';

jest.mock('next-auth/react');

const useSessionMocked = jest.mocked(useSession);

describe('hooks/useSpotify.ts', () => {
  test('セッションがあればアクセストークンがセットされる', () => {
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated',
    });

    const { result, rerender } = renderHook(() => useSpotify());
    expect(result.current.getAccessToken()).toBeUndefined();

    const accessToken = 'accessToken';
    useSessionMocked.mockReturnValueOnce({
      data: {
        accessToken,
        expires: '',
      },
      status: 'authenticated',
    });

    rerender();
    expect(result.current.getAccessToken()).toBe(accessToken);
  });
});
