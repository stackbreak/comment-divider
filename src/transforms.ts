import { Transform } from './types';

///

const pass = (words: string) => words;

const toLowerCase = (words: string): string => words.toLowerCase();

const toUpperCase = (words: string): string => words.toUpperCase();

const toTitleCase = (words: string): string =>
  words
    .split(' ')
    .map((word) =>
      Array.from(word)
        .map((char, idx) => (idx === 0 ? char.toUpperCase() : char))
        .join('')
    )
    .join(' ');

///

export const TRANSFORM_MAP: { [key in Transform]: any } = {
  lowercase: toLowerCase,
  uppercase: toUpperCase,
  titlecase: toTitleCase,
  none: pass
};
