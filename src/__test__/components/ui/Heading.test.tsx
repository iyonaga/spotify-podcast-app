import { render, screen } from '@testing-library/react';
import Heading from '@/components/ui/Heading';
import type { Tag } from '@/components/ui/Heading';

describe('components/ui/Heading.tsx', () => {
  test('正しいタグが描画される', () => {
    const tags: Tag[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    tags.forEach((tag) => {
      const { container } = render(<Heading tag={tag}>Heading</Heading>);
      expect(container.querySelector(`${tag}`)).toBeInTheDocument();
    });
  });

  test('正しいテキストが描画される', () => {
    const value = 'テキスト';
    render(<Heading>{value}</Heading>);
    expect(screen.getByText(value)).toBeInTheDocument();
  });
});
