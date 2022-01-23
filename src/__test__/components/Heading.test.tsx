import { render } from '@testing-library/react';
import Heading from '@/components/Heading';
import '@testing-library/jest-dom';

describe('components/Heading.tsx', () => {
  test('正しいテキストが描画される', () => {
    const value = 'テキスト';
    const { getByText } = render(<Heading>{value}</Heading>);

    expect(getByText(value)).toBeInTheDocument();
  });
});
