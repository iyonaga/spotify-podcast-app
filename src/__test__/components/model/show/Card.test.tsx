import { render } from '@testing-library/react';
import Card from '@/components/model/show/Card';
import { showsMock } from '@/mocks/showsMock';

describe('components/model/show/Card.tsx', () => {
  test('スナップショットが一致する', () => {
    const { asFragment } = render(<Card show={showsMock[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
