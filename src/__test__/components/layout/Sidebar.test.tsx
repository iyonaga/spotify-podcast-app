import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { signOut } from 'next-auth/react';
import Sidebar from '@/components/layout/Sidebar';

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/',
    };
  },
}));

describe('components/layout/Sidebar.tsx', () => {
  test('スナップショットが一致する', () => {
    const { asFragment } = render(<Sidebar />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('sign outボタンをクリックするとサインアウトが実行される', async () => {
    render(<Sidebar />);
    userEvent.click(screen.getByRole('button'));
    expect(signOut).toHaveBeenCalled();
  });
});
