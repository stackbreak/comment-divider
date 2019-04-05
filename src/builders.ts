import { GAP_SYM, NEW_LINE_SYM, WORDS_INJECTORS_MAP } from './constants';
import { IWordsAnchors, IConfig, CharList } from './types';

/* --------------------------------- Helpers -------------------------------- */

const buildBlankCharList = (lineLen: number, filler: string): CharList =>
  Array(lineLen).fill(filler);

///

const charListToString = (charList: CharList) => charList.join('');

///

const isEven = (num: number) => num % 2 === 0;

///

const getWordsAnchors = (charList: CharList, words: string): IWordsAnchors => {
  const smartRound =
    !isEven(words.length) && !isEven(charList.length) ? Math.floor : Math.ceil;
  const halfLen = smartRound(charList.length / 2);
  const halfWord = Math.floor(words.length / 2);
  const leftAnchor = halfLen - halfWord;
  const rightAnchor = leftAnchor + (words.length - 1);

  return { leftAnchor, rightAnchor };
};

/* -------------------------------- Injectors ------------------------------- */

export const withLimiters = (leftLim: string, rightLim: string) => (
  charList: CharList
): CharList => {
  const rightLimAnchor = charList.length - rightLim.length;

  return charList.map((char, i) => {
    // Insert left limiter
    if (i < leftLim.length) return leftLim[i];
    // Insert right limiter
    else if (i >= rightLimAnchor) return rightLim[i - rightLimAnchor];
    // Insert gaps after/before non-empty limiters
    else if (
      (leftLim.length && i === leftLim.length) ||
      (rightLim.length && i === rightLimAnchor - 1)
    )
      return GAP_SYM;
    // Pass other chars
    else return char;
  });
};

///

export const withCenterWords = (words: string) => (charList: CharList): CharList => {
  const { leftAnchor, rightAnchor } = getWordsAnchors(charList, words);

  return charList.map((char, i) => {
    // Insert words
    if (i >= leftAnchor && i <= rightAnchor) return words[i - leftAnchor];
    // Insert gaps before/after words
    else if (i === leftAnchor - 1 || i === rightAnchor + 1) return GAP_SYM;
    // Pass other chars
    else return char;
  });
};

export const withLeftWords = (words: string) => (charList: CharList): CharList => {
  return charList.map((i) => i); // mock
};

///

export const withRightWords = (words: string) => (charList: CharList): CharList => {
  return charList.map((i) => i); // mock
};

///

const passToNextInjector = (charList: CharList) => charList;

///

const composeInjectors = (...injectors) => (charList: CharList) =>
  injectors.reduce((res: CharList, injector) => injector(res), charList);

/* ------------------------------ Line Builders ----------------------------- */

export const buildSolidLine = (config: IConfig): string => {
  const injectLimiters = withLimiters(config.limiters.left, config.limiters.right);

  const blankCharList = buildBlankCharList(config.lineLen, config.sym);
  const computedCharList = composeInjectors(injectLimiters)(blankCharList);

  return charListToString(computedCharList);
};

///

export const buildWordsLine = (config: IConfig, transformedWords: string): string => {
  const injectLimiters = withLimiters(config.limiters.left, config.limiters.right);
  const injectWords = WORDS_INJECTORS_MAP[config.align](transformedWords);

  const blankCharList = buildBlankCharList(config.lineLen, config.sym);
  const computedCharList = composeInjectors(injectLimiters, injectWords)(blankCharList);

  return charListToString(computedCharList);
};

/* ----------------------------- Block Builders ----------------------------- */

export const buildBlock = (config: IConfig, transformedWords: string): string => {
  const textConfig: IConfig = { ...config, sym: GAP_SYM };
  const topLine = buildSolidLine(config);
  const textLine = buildWordsLine(textConfig, transformedWords);
  const bottomLine = buildSolidLine(config);

  return topLine + NEW_LINE_SYM + textLine + NEW_LINE_SYM + bottomLine;
};
