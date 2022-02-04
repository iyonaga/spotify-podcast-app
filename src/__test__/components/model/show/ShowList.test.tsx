import { render, screen } from '@testing-library/react';
import ShowList from '@/components/model/show/ShowList';
import { showsMock } from '@/mocks/showsMock';
import '@/components/model/show/Card';

jest.mock('@/components/model/show/Card', () => {
  return function DummyCard() {
    return <div data-testid="card">Card</div>;
  };
});

describe('components/model/show/ShowList.tsx', () => {
  test('番組がレンダリングされる', () => {
    render(<ShowList shows={showsMock} />);
    expect(screen.getAllByTestId('card').length).toBe(showsMock.length);
  });
});
