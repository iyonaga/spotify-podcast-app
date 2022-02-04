import { render, screen } from '@testing-library/react';
import LinkButton from '@/components/ui/LinkButton';

const href = 'https://example.com';
const props = {
  href,
};

describe('components/ui/LinkButton.tsx', () => {
  test('スナップショットが一致する', () => {
    const { asFragment, rerender } = render(
      <LinkButton {...props}>link text</LinkButton>
    );

    expect(asFragment()).toMatchSnapshot();
    rerender(
      <LinkButton {...props} isExternal={true}>
        link text
      </LinkButton>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('外部リンクは新しいタブで開く', () => {
    render(
      <LinkButton {...props} isExternal={true}>
        link text
      </LinkButton>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', href);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer noopener');
  });
});
