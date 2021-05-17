import { TextLine, window } from 'vscode';

import { getConfig } from './config';
import { NEW_LINE_SYM } from './constants';
import { checkLongText, checkCommentChars, checkFillerLen } from './errors';
import { BUILDERS_MAP, buildSolidLine } from './builders';
import { TRANSFORM_MAP } from './transforms';
import { PresetId, IMargins, IConfig } from './types';

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

const extractIndent = (rawText: string): string => rawText.split(/\S+/)[0];

export const wrapWithMargins = (content: string, line: TextLine): string => {
  const margins = computeMargins(line);

  const before: string = margins.top ? NEW_LINE_SYM : '';
  const after: string = margins.bottom ? NEW_LINE_SYM : '';

  return before + content + after;
};

export const wrapWithLineBreaker = (content: string): string => content + NEW_LINE_SYM;

const renderHeader = (croppedText: string, config: IConfig, indent: string): string => {
  checkCommentChars(croppedText, config.limiters);
  checkLongText(croppedText, config.lineLen, config.limiters);
  checkFillerLen(config.sym);

  const transformedWords = TRANSFORM_MAP[config.transform](croppedText);
  const buildFn = BUILDERS_MAP[config.height];
  return buildFn(config, transformedWords, indent);
};

const renderLine = (config: IConfig, indent: string): string => {
  checkFillerLen(config.sym);

  const buildFn = buildSolidLine;
  return buildFn(config, indent);
};

export const render = (type: PresetId, rawText: string, lang: string): string => {
  const config = getConfig(type, lang);
  const indent = extractIndent(rawText);

  if (config.includeIndent) {
    config.lineLen = config.lineLen - indent.length;
  }

  const croppedText = rawText.trim();

  switch (type) {
    case 'line':
      return renderLine(config, indent);
    case 'mainHeader':
    case 'subheader':
      return renderHeader(croppedText, config, indent);
  }
};
