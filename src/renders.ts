import { TextLine, window } from 'vscode';

import { getConfig } from './config';
import { NEW_LINE_SYM } from './constants';
import { checkLongText, checkCommentChars, checkFillerLen } from './errors';
import { BUILDERS_MAP, buildSolidLine } from './builders';
import { TRANSFORM_MAP } from './transforms';
import { PresetId, IMargins } from './types';

const isEmptyLine = (lineNum: number) =>
  window.activeTextEditor.document.lineAt(lineNum).isEmptyOrWhitespace;

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

export const wrapWithMargins = (content: string, line: TextLine): string => {
  const margins = computeMargins(line);

  const before: string = margins.top ? NEW_LINE_SYM : '';
  const after: string = margins.bottom ? NEW_LINE_SYM : '';

  return before + content + after;
};

export const wrapWithLinebreaker = (content: string): string => content + NEW_LINE_SYM;

export const renderHeader = (
  type: Exclude<PresetId, 'line'>,
  rawText: string,
  lang: string
): string => {
  const config = getConfig(type, lang);
  const croppedText = rawText.trim();

  checkCommentChars(croppedText, config.limiters);
  checkLongText(croppedText, config.lineLen, config.limiters);
  checkFillerLen(config.sym);

  const transformedWords = TRANSFORM_MAP[config.transform](croppedText);
  const build = BUILDERS_MAP[config.height];
  return build(config, transformedWords);
};

export const renderLine = (lang: string): string => {
  const config = getConfig('line', lang);

  checkFillerLen(config.sym);

  const build = buildSolidLine;
  return build(config);
};
