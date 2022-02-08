import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import Item from '@/components/model/episode/Item';
import { episodesMock } from '@/mocks/data/episodes';

jest.mock('next/router');

describe('components/model/episode/Item.tsx', () => {
  test('スナップショットが一致する', () => {
    const { asFragment } = render(<Item episode={episodesMock[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('クリックするとエピソード詳細ページに遷移する', () => {
    const useRouterMocked = jest.mocked(useRouter);
    const pushMock = jest.fn();
    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);
    const { container } = render(<Item episode={episodesMock[0]} />);
    userEvent.click(container.children[0]);
    expect(pushMock).toHaveBeenCalledWith(`/episode/${episodesMock[0].id}`);
  });
});
