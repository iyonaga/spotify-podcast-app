import { renderHook, act } from '@testing-library/react-hooks';
import { useDebounce } from '@/hooks/useDebounce';

describe('hooks/useDebounce.ts', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('タイムアウト後に新しい値が設定される', () => {
    const text = 'text';
    const newText = 'new text';
    const delay = 300;
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: {
          value: text,
          delay,
        },
      }
    );

    rerender({ value: newText, delay });
    expect(result.current).toBe(text);
    act(() => {
      jest.advanceTimersByTime(delay - 1);
    });
    expect(result.current).toBe(text);
    act(() => {
      jest.advanceTimersByTime(delay);
    });
    expect(result.current).toBe(newText);
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current).toBe(newText);
  });
});
