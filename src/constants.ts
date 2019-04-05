import { Align, Height } from './types';
import {
  withCenterWords,
  withLeftWords,
  withRightWords,
  buildBlock,
  buildLine
} from './builders';

/* --------------------------------- Common --------------------------------- */

export const EXT_NAME = 'Comment Divider';
export const EXT_ID = 'comment-divider';

export const GAP_SYM = ' ';
export const NEW_LINE_SYM = '\n';

/* --------------------------- Words Injectors Map -------------------------- */

export const WORDS_INJECTORS_MAP: { [key in Align]: any } = {
  left: withLeftWords,
  right: withRightWords,
  center: withCenterWords
};

/* ------------------------------ Builders Map ------------------------------ */

export const BUILDERS_MAP: { [key in Height]: any } = {
  block: buildBlock,
  line: buildLine
};
