/* -------------------------------------------------------------------------- */
/*                                   ERRORS                                   */
/* -------------------------------------------------------------------------- */

import { window, Selection, TextLine } from 'vscode';

import { EXT_NAME } from './constants';
import { ILimiters } from './limiters';

///

export const ERRORS = {
  EMPTY_LINE: 'EmptyLine',
  MULTI_LINE: 'MultiLine',
  LONG_TEXT: 'LongText',
  COMMENT_CHARS: 'CommentChars'
};

/* --------------------------------- Helpers -------------------------------- */

const showErrorMsg = (msg: string) =>
  window.showInformationMessage(`${EXT_NAME}: ${msg}`);

/* -------------------------------- Checkers -------------------------------- */

export const checkMultiLineSelection = (selection: Selection) => {
  if (!selection.isSingleLine) throw new Error(ERRORS.MULTI_LINE);
};

///

export const checkEmptyLine = (line: TextLine) => {
  if (line.isEmptyOrWhitespace) throw new Error(ERRORS.EMPTY_LINE);
};

///

export const checkCommentChars = (text: string, limiters: ILimiters) => {
  if (text.includes(limiters.left) || text.includes(limiters.right))
    throw new Error(ERRORS.COMMENT_CHARS);
};

///

export const checkLongText = (text: string, lineLen: number, limiters: ILimiters) => {
  const limitersLen = limiters.left.length + limiters.right.length;
  const gapsCount = 4;
  const minFillerCount = 2;
  const maxAllowedLen = lineLen - (limitersLen + gapsCount + minFillerCount);
  if (text.length > maxAllowedLen) throw new Error(ERRORS.LONG_TEXT);
};

/* --------------------------------- Handler -------------------------------- */

export const handleError = (e: Error) => {
  switch (e.message) {
    case ERRORS.EMPTY_LINE:
      showErrorMsg('Line should contain at least one character!');
      break;

    case ERRORS.MULTI_LINE:
      showErrorMsg('Selection should be on single line!');
      break;

    case ERRORS.LONG_TEXT:
      showErrorMsg(
        'Too many characters! Increase divider length in settings or use less characters.'
      );
      break;

    case ERRORS.COMMENT_CHARS:
      showErrorMsg('Line contains comment characters!');
      break;
  }
};
