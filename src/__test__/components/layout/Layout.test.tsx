import { render, screen } from '@testing-library/react';
import Layout from '@/components/layout/Layout';

jest.mock(
  '@/components/layout/Sidebar',
  () =>
    function mockSidebar() {
      return <div />;
    }
);
jest.mock(
  '@/components/layout/SearchBar',
  () =>
    function mockSearchBar() {
      return <div />;
    }
);

describe('components/layout/Layout.tsx', () => {
  test('スナップショットが一致する', () => {
    const { asFragment } = render(<Layout>test</Layout>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('子要素が描画される', () => {
    const children = 'test';
    render(<Layout>{children}</Layout>);
    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
