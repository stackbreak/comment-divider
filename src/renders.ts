/* -------------------------------------------------------------------------- */
/*                                LINE RENDERS                                */
/* -------------------------------------------------------------------------- */

import { TextLine, window } from 'vscode';

import { IConfig, getConfig } from './config';
import { GAP_SYM, NEW_LINE_SYM } from './constants';
import { checkLongText, checkCommentChars } from './errors';
import { buildLine } from './builders';

/* --------------------------------- Helpers -------------------------------- */

const isEmptyLine = (lineNum: number) =>
  window.activeTextEditor.document.lineAt(lineNum).isEmptyOrWhitespace;

/* --------------------------------- Margins -------------------------------- */

interface IMargins {
  top: boolean;
  bottom: boolean;
}

const computeMargins = (line: TextLine): IMargins => {
  const lastLineNum = window.activeTextEditor.document.lineCount - 1;
  const prevLineNum = line.lineNumber - 1;
  const nextLineNum = line.lineNumber + 1;
  const margins = {
    top: false,
    bottom: false
  };

  margins.top = prevLineNum >= 0 && !isEmptyLine(prevLineNum);
  margins.bottom = nextLineNum <= lastLineNum && !isEmptyLine(nextLineNum);

  return margins;
};

///

export const wrapWithMargins = (content: string, line: TextLine): string => {
  const margins = computeMargins(line);

  const before: string = margins.top ? NEW_LINE_SYM : '';
  const after: string = margins.bottom ? NEW_LINE_SYM : '';

  return before + content + after;
};

export const wrapWithLinebreaker = (content: string): string => content + NEW_LINE_SYM;

/* --------------------------------- Renders -------------------------------- */

export const renderMainHeader = (text: string, lang: string): string => {
  const config = getConfig('mainheader', lang);

  checkCommentChars(text, config.limiters);
  checkLongText(text, config.lineLen, config.limiters);

  const textConfig: IConfig = { ...config, sym: GAP_SYM };
  const topLine = buildLine(config);
  const textLine = buildLine(textConfig, text.toUpperCase());
  const bottomLine = buildLine(config);

  return topLine + NEW_LINE_SYM + textLine + NEW_LINE_SYM + bottomLine;
};

///

export const renderSubHeader = (text: string, lang: string): string => {
  const config = getConfig('subheader', lang);

  checkCommentChars(text, config.limiters);
  checkLongText(text, config.lineLen, config.limiters);

  return buildLine(config, text);
};

///

export const renderLine = (lang: string): string => {
  const config = getConfig('line', lang);

  return buildLine(config);
};
