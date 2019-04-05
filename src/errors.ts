import { window, Selection, TextLine } from 'vscode';

import { EXT_NAME } from './constants';
import { ILimiters } from './types';

///

export const ERRORS = {
  EMPTY_LINE: 'Line should contain at least one character!',
  MULTI_LINE: 'Selection should be on single line!',
  LONG_TEXT:
    'Too many characters! Increase divider length in settings or use less characters.',
  COMMENT_CHARS: 'Line contains comment characters!'
};

/* --------------------------------- Helpers -------------------------------- */

const showErrorMsg = (msg: string) =>
  window.showInformationMessage(`${EXT_NAME}: ${msg}`);

/* -------------------------------- Checkers -------------------------------- */

export const checkMultiLineSelection = (selection: Selection) => {
  if (!selection.isSingleLine) throw new Error('MULTI_LINE');
};

///

export const checkEmptyLine = (line: TextLine) => {
  if (line.isEmptyOrWhitespace) throw new Error('EMPTY_LINE');
};

///

export const checkCommentChars = (text: string, limiters: ILimiters) => {
  if (text.includes(limiters.left) || text.includes(limiters.right))
    throw new Error('COMMENT_CHARS');
};

///

export const checkLongText = (text: string, lineLen: number, limiters: ILimiters) => {
  const limitersLen = limiters.left.length + limiters.right.length;
  const gapsCount = 4;
  const minFillerCount = 2;
  const maxAllowedLen = lineLen - (limitersLen + gapsCount + minFillerCount);
  if (text.length > maxAllowedLen) throw new Error('LONG_TEXT');
};

/* --------------------------------- Handler -------------------------------- */

export const handleError = (e: Error) => {
  const errorMsg = ERRORS[e.message];
  if (errorMsg !== undefined) showErrorMsg(errorMsg);
};
