import { TextLine, window } from 'vscode';

import { getConfig } from './config';
import { NEW_LINE_SYM, BUILDERS_MAP } from './constants';
import { checkLongText, checkCommentChars } from './errors';
import { PresetId, IMargins } from './types';

/* --------------------------------- Helpers -------------------------------- */

const isEmptyLine = (lineNum: number) =>
  window.activeTextEditor.document.lineAt(lineNum).isEmptyOrWhitespace;

/* --------------------------------- Margins -------------------------------- */

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

///

export const wrapWithLinebreaker = (content: string): string => content + NEW_LINE_SYM;

/* --------------------------------- Renders -------------------------------- */

export const renderHeader = (
  type: Exclude<PresetId, 'line'>,
  rawText: string,
  lang: string
): string => {
  const config = getConfig(type, lang);
  const cutText = rawText.trim();

  checkCommentChars(cutText, config.limiters);
  checkLongText(cutText, config.lineLen, config.limiters);

  const build = BUILDERS_MAP[config.height];
  const transformedWords = cutText; // mock

  return build(config, transformedWords);
};

///

export const renderLine = (lang: string): string => {
  const config = getConfig('line', lang);
  const build = BUILDERS_MAP.line;

  return build(config);
};
