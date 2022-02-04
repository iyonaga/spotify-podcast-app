import { render, screen } from '@testing-library/react';
import EpisodeList from '@/components/model/episode/EpisodeList';
import { episodesMock } from '@/mocks/episodesMock';

jest.mock('@/components/model/episode/Item', () => {
  return function DummyItem() {
    return <div data-testid="item">Item</div>;
  };
});

describe('components/model/episode/EpisodeList.tsx', () => {
  test('エピソードがレンダリングされる', () => {
    render(<EpisodeList episodes={episodesMock} />);
    expect(screen.getAllByTestId('item').length).toBe(episodesMock.length);
  });
});
