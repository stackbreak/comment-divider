import { TextLine } from 'vscode';

///

export type Action = (line: TextLine, lang: string) => void;

export type PresetId = 'subheader' | 'mainHeader' | 'line';

export type Height = 'line' | 'block';
export type Align = 'left' | 'center' | 'right';
export type Transform = 'uppercase' | 'lowercase' | 'titlecase' | 'none';

export type CharList = string[];

///

export interface IMargins {
  top: boolean;
  bottom: boolean;
}

export interface ILimiters {
  left: string;
  right: string;
}

export interface IPreset {
  lineLen: number;
  sym: string;
  height: Height;
  align: Align;
  transform: Transform;
}

export interface IConfig extends IPreset {
  limiters: ILimiters;
}

export interface IWordsAnchors {
  leftAnchor: number;
  rightAnchor: number;
}

export interface ILanguagesMapConfig {
  [key: string]: string[];
}
