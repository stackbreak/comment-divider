/* -------------------------------------------------------------------------- */
/*                                CONFIG READER                               */
/* -------------------------------------------------------------------------- */

import { workspace } from 'vscode';

import { EXT_ID } from './constants';
import { ILimiters, getLanguageLimiters } from './limiters';

///

type PresetId = 'subheader' | 'mainheader' | 'line';

interface IPreset {
  lineLen: number;
  sym: string;
  height: string;
  align: string;
  transform: string;
}

export interface IConfig extends IPreset {
  limiters: ILimiters;
}

/* ----------------------------- Config Builder ----------------------------- */

const getPreset = (type: PresetId): IPreset => {
  const section = workspace.getConfiguration(EXT_ID);
  const lineLen: number = section.get('length');

  const sym: string = section.get(`${type}-filler`);
  const height: string = section.get(`${type}-height`);
  const align: string = section.get(`${type}-align`);
  const transform: string = section.get(`${type}-transform`);

  return { lineLen, sym, height, align, transform };
};

///

const mergePresetWithLimiters = (preset: IPreset, limiters: ILimiters): IConfig => ({
  ...preset,
  limiters
});

export const getConfig = (presetId: PresetId, lang: string): IConfig =>
  mergePresetWithLimiters(getPreset(presetId), getLanguageLimiters(lang));
