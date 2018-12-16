/* ========================================================================== */
/*                                READ SETTINGS                               */
/* ========================================================================== */

import { workspace } from 'vscode';

import { GAP_SYM, EXT_ID } from './constants';
import { ILimiters } from './limiters';

///

type PresetId = 'empty' | 'subheader' | 'mainheader' | 'line';

interface IPreset {
  lineLen: number;
  sym: string;
}

export interface IConfig extends IPreset {
  limiters: ILimiters;
}

/* ----------------------------- Config Builder ----------------------------- */

export const getPreset = (type: PresetId): IPreset => {
  const section = workspace.getConfiguration(EXT_ID);
  const lineLen: number = section.get('length');
  const sym: string = type === 'empty' ? GAP_SYM : section.get(`${type}-filler`);

  return { lineLen, sym };
};

///

export const mergePresetWithLimiters = (
  preset: IPreset,
  limiters: ILimiters
): IConfig => ({
  ...preset,
  limiters
});
