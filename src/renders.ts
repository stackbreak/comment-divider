import { getConfig } from './config';
import { checkLongText, checkCommentChars, checkFillerLen } from './errors';
import { BUILDERS_MAP, buildSolidLine } from './builders';
import { TRANSFORM_MAP } from './transforms';
import { PresetId, IConfig } from './types';

const extractIndent = (rawText: string): string => rawText.split(/\S+/)[0];

const renderHeader = (croppedText: string, config: IConfig, indent: string): string => {
  checkCommentChars(croppedText, config.limiters);
  checkLongText(croppedText, config.lineLen, config.limiters);
  checkFillerLen(config.sym);

  const transformedWords = TRANSFORM_MAP[config.transform](croppedText);
  const buildFn = BUILDERS_MAP[config.height];
  return buildFn(config, transformedWords, indent);
};

const renderLine = (config: IConfig, indent: string): string => {
  checkLongText('', config.lineLen, config.limiters);
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
