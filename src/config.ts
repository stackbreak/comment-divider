/* ========================================================================== */
/*                                READ SETTINGS                               */
/* ========================================================================== */

import { workspace } from 'vscode';

import { GAP_SYM, EXT_ID } from './constants';
import { ILimiters } from './limiters';

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

export const getPreset = (type: PresetId): IPreset => {
  const section = workspace.getConfiguration(EXT_ID);
  const lineLen: number = section.get('length');

  const sym: string = section.get(`${type}-filler`);
  const height: string = section.get(`${type}-height`);
  const align: string = section.get(`${type}-align`);
  const transform: string = section.get(`${type}-transform`);

  return { lineLen, sym, height, align, transform };
};

///

export const mergePresetWithLimiters = (
  preset: IPreset,
  limiters: ILimiters
): IConfig => ({
  ...preset,
  limiters
});
