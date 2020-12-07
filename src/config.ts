import { workspace } from 'vscode';

import { EXT_ID } from './constants';
import { getLanguageLimiters } from './limiters';
import {
  IPreset,
  ILimiters,
  IConfig,
  PresetId,
  Height,
  Align,
  Transform,
  ILanguagesMapConfig
} from './types';

///

const getPreset = (type: PresetId): IPreset => {
  const section = workspace.getConfiguration(EXT_ID);

  const lineLen = section.get<number>('length');
  const sym = section.get<string>(`${type}Filler`);
  const height = section.get<Height>(`${type}Height`);
  const align = section.get<Align>(`${type}Align`);
  const transform = section.get<Transform>(`${type}Transform`);

  return { lineLen, sym, height, align, transform };
};

///

const getLanguagesMapConfig = () =>
  workspace.getConfiguration(EXT_ID).inspect('languagesMap')
    .globalValue as ILanguagesMapConfig;

///

const mergePresetWithLimiters = (preset: IPreset, limiters: ILimiters): IConfig => ({
  ...preset,
  limiters
});

///

export const getConfig = (presetId: PresetId, lang: string): IConfig =>
  mergePresetWithLimiters(
    getPreset(presetId),
    getLanguageLimiters(lang, getLanguagesMapConfig)
  );
