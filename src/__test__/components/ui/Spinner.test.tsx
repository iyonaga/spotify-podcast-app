import { render } from '@testing-library/react';
import Spinner from '@/components/ui/Spinner';

describe('components/ui/Spinner.tsx', () => {
  test('スナップショットが一致する', () => {
    const { asFragment } = render(<Spinner />);
    expect(asFragment()).toMatchSnapshot();
  });
});
