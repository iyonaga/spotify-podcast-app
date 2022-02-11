import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from '@/components/ui/SearchInput';

const handleChange = jest.fn();
const handleKeyPress = jest.fn();
const searchInputText = '';
const props = {
  handleChange,
  handleKeyPress,
  searchInput: searchInputText,
};

describe('components/ui/SearchInput.tsx', () => {
  beforeEach(() => {
    handleChange.mockClear();
    handleKeyPress.mockClear();
  });

  test('スナップショットが一致する', () => {
    const { asFragment } = render(<SearchInput {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('valueが設定される', () => {
    const { rerender } = render(<SearchInput {...props} />);
    expect(screen.getByRole('textbox')).toHaveValue(searchInputText);
    rerender(<SearchInput {...props} searchInput="dummy" />);
    expect(screen.getByRole('textbox')).toHaveValue('dummy');
  });

  test('onChangeイベントが発火する', () => {
    render(<SearchInput {...props} />);
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'test');
    expect(handleChange).toHaveBeenCalledTimes(4);
  });

  test('onKeyPressイベントが発火する', () => {
    render(<SearchInput {...props} />);
    const input = screen.getByRole('textbox');
    fireEvent.keyPress(input, { key: 'Enter', keyCode: 13 });
    expect(handleKeyPress).toHaveBeenCalledTimes(1);
  });
});
