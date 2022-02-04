import { render } from '@testing-library/react';
import EpisodeInfo from '@/components/model/episode/EpisodeInfo';
import { episodesMock } from '@/mocks/episodesMock';

describe('components/model/episode/EpisodeInfo.tsx', () => {
  test('スナップショットが一致する', () => {
    const { asFragment } = render(<EpisodeInfo episode={episodesMock[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
