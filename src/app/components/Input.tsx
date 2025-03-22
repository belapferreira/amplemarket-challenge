// - Assume phone numbers will be American - e.g. (650) 965-5137
// - Build it using `React.js`
// - Shouldn't allow to type numbers with more than 10 digits
// - Shouldn’t allow typing anything but digits
// - The country indicator & dropdown are not requirements. If you wish to support it, feel free to do it.
// - Feel free to Google or search any source you want
// - Do not use ChatGPT, co-pilot or any other AI

'use client';

import {
  ChangeEvent,
  ComponentProps,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
} from 'react';
import { cn } from '../utils/cn';

type Props = ComponentProps<'input'> & {
  label?: string;
};

// Brazilian phone number resources

// const pattern = '(99) 99999-9999';
// const maxLength = pattern.length;

// Brazilian phone number mask
// const phoneMask = (value: string) => {
//   return value
//     .replace(/\D/g, '')
//     .replace(/(\d{2})(\d)/, '($1) $2')
//     .replace(/(\d{5})(\d)/, '$1-$2');
// };

// American phone number resources

const pattern = '(999) 999-9999';
const maxLength = pattern.length;

const phoneMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '($1) $2')
    .replace(/(\d{3})(\d)/, '$1-$2');
};

const findNextDigitPosition = (currentPosition: number): number => {
  // Don't allow to exceed the pattern length
  if (currentPosition >= pattern.length - 1) {
    return -1; // No more digit positions
  }

  // Start checking from the next position
  for (let i = currentPosition + 1; i < pattern.length; i++) {
    if (pattern[i] === '9') {
      // Return the next digit position
      return i;
    }
  }

  // No more digit positions after the current one
  return -1;
};

export const Input = (props: Props) => {
  const [value, setValue] = useState('');

  const { label, ...rest } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const cursorRef = useRef<number | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    const updatedValue = phoneMask(inputValue);

    setValue(updatedValue);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const isRemovingCharacter =
      event.key === 'Backspace' || event.key === 'Delete';

    const isBackspaceKey = event.key === 'Backspace';

    const positionSub = isBackspaceKey ? 1 : 0;

    if (inputRef.current) {
      const cursorPosition = inputRef.current.selectionStart || 0;

      if (isRemovingCharacter) {
        cursorRef.current = cursorPosition - positionSub;
        return;
      }

      const nextDigit = findNextDigitPosition(cursorPosition);

      if (nextDigit - cursorPosition >= 1) {
        cursorRef.current = nextDigit + 1;
        return;
      }

      cursorRef.current = nextDigit;
    }
  };

  useEffect(() => {
    const input = inputRef.current;
    const cursor = cursorRef.current;

    if (input && cursor) {
      input.setSelectionRange(cursor, cursor);
    }
  }, [value]);

  return (
    <div className="w-full">
      {label && <label className="text-xs text-zinc-700">{label}</label>}

      <input
        value={value}
        maxLength={maxLength}
        ref={inputRef}
        onChange={handleChange}
        onKeyDown={(event) => handleKeyDown(event)}
        className={cn(
          'h-11 w-full rounded-sm border border-zinc-300 p-2 outline-none',
          'focus-within:border-zinc-800 focus:border-zinc-800',
          'transition-colors duration-200 placeholder:text-sm placeholder:text-zinc-400'
        )}
        {...rest}
      />
    </div>
  );
};
