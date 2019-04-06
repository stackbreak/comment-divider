import { Align, Height } from './types';
import { buildBlock, buildWordsLine } from './builders';

/* --------------------------------- Common --------------------------------- */

export const EXT_NAME = 'Comment Divider';
export const EXT_ID = 'comment-divider';

export const GAP_SYM = ' ';
export const NEW_LINE_SYM = '\n';

/* ------------------------------ Builders Map ------------------------------ */

export const BUILDERS_MAP: { [key in Height]: any } = {
  block: buildBlock,
  line: buildWordsLine
};
