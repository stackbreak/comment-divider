import { TextLine, window } from 'vscode';

import { getConfig } from './config';
import { NEW_LINE_SYM } from './constants';
import { checkLongText, checkCommentChars, checkFillerLen } from './errors';
import { BUILDERS_MAP, buildSolidLine } from './builders';
import { TRANSFORM_MAP } from './transforms';
import { PresetId, IMargins, IConfig } from './types';

/* --------------------------------- Helpers -------------------------------- */

const isEmptyLine = (lineNum: number) =>
  window.activeTextEditor.document.lineAt(lineNum).isEmptyOrWhitespace;

// Fixes lineLength according to indentLen if fixLen enabled
const fixConfigLen = (config: IConfig, indentLen: number) =>
  config.fixLen ? { ...config, lineLen: config.lineLen - indentLen } : config;

const convertTabsToSpaces = (str: string, tabWidth: number): string =>
  str.split('\t').join(' '.repeat(tabWidth));

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

export const wrapWithLineBreaker = (content: string): string => content + NEW_LINE_SYM;

/* --------------------------------- Renders -------------------------------- */

export const renderComment = (type: PresetId, rawText: string, lang: string): string => {
  const tabWidth = +window.activeTextEditor.options.tabSize;
  // Get leading whitespaces and replace tabs with spaces
  const indent = convertTabsToSpaces(rawText.match(/^\s*/)[0], tabWidth);

  const config = fixConfigLen(getConfig(type, lang), indent.length);
  const croppedText = rawText.trim();

  switch (type) {
    case 'line':
      return renderLine(config, indent);
    case 'mainHeader':
      return renderHeader(croppedText, config, indent);
    case 'subheader':
      return renderHeader(croppedText, config, indent);
  }
};

///

export const renderHeader = (
  text: string,
  config: IConfig,
  indent: string = ''
): string => {
  checkCommentChars(text, config.limiters);
  checkLongText(text, config, indent.length);
  checkFillerLen(config.sym);

  const transformedWords = TRANSFORM_MAP[config.transform](text);
  const build = BUILDERS_MAP[config.height];
  return build(config, transformedWords, indent);
};

///

export const renderLine = (config: IConfig, indent: string = ''): string => {
  checkFillerLen(config.sym);

  const build = buildSolidLine;
  return build(config, indent);
};
