/* ========================================================================== */
/*                                LINE RENDERS                                */
/* ========================================================================== */

import { getPreset, mergePresetWithLimiters, IConfig } from './config';
import { GAP_SYM, NEW_LINE_SYM } from './constants';
import { getLanguageLimiters } from './limiters';
import { checkLongText, checkCommentChars } from './errors';

///

type CharList = string[];

interface IWordsAnchors {
  leftAnchor: number;
  rightAnchor: number;
}

/* --------------------------------- Helpers -------------------------------- */

const buildCharList = (lineLen: number, filler: string): CharList =>
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

const withLimiters = (leftLim: string, rightLim: string) => (
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

const withWords = (words: string) => (charList: CharList): CharList => {
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

///

const passToNextInjector = (charList: CharList) => charList;

///

const composeInjectors = (...injectors) => (charList: CharList) =>
  injectors.reduce((res: CharList, injector) => injector(res), charList);

/* ------------------------------ Line Builders ----------------------------- */

const buildLine = (config: IConfig, words?: string) => {
  const injectLimiters = withLimiters(config.limiters.left, config.limiters.right);
  const injectWords = words ? withWords(words) : passToNextInjector;

  const blankCharList = buildCharList(config.lineLen, config.sym);
  const computedCharList = composeInjectors(injectLimiters, injectWords)(blankCharList);

  return charListToString(computedCharList);
};

/* --------------------------------- Renders -------------------------------- */

export const renderSubHeader = (text: string, lang: string): string => {
  const config = mergePresetWithLimiters(
    getPreset('subheader'),
    getLanguageLimiters(lang)
  );

  checkCommentChars(text, config.limiters);
  checkLongText(text, config.lineLen, config.limiters);

  return buildLine(config, text);
};

///

export const renderMainHeader = (text: string, lang: string): string => {
  const config = mergePresetWithLimiters(
    getPreset('mainheader'),
    getLanguageLimiters(lang)
  );

  checkCommentChars(text, config.limiters);
  checkLongText(text, config.lineLen, config.limiters);

  const textConfig = { ...config, sym: GAP_SYM };
  const topLine = buildLine(config);
  const textLine = buildLine(textConfig, text.toUpperCase());
  const bottomLine = buildLine(config);

  return topLine + NEW_LINE_SYM + textLine + NEW_LINE_SYM + bottomLine;
};

///

export const renderLine = (lang: string): string => {
  const config = mergePresetWithLimiters(getPreset('line'), getLanguageLimiters(lang));

  return buildLine(config);
};
