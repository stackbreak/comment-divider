import { commands, TextEditorEdit, window } from 'vscode';

import {wrapWithMargins, wrapWithLineBreaker, renderComment} from './renders';
import { checkEmptyLine } from './errors';
import { Action } from './types';

/* --------------------------------- Inserts -------------------------------- */

export const insertMainHeader: Action = (line, lang) => {
  checkEmptyLine(line);

  const rendered = renderComment('mainHeader', line.text, lang);
  const content = wrapWithMargins(rendered, line);

  window.activeTextEditor
    .edit((textEditorEdit: TextEditorEdit) => {
      textEditorEdit.replace(line.range, content);
    })
    .then(() => {
      commands.executeCommand('cursorEnd');
    });
};

///

export const insertSubHeader: Action = (line, lang) => {
  checkEmptyLine(line);

  const rendered = renderComment('subheader', line.text, lang);
  const content = wrapWithMargins(rendered, line);

  window.activeTextEditor
    .edit((textEditorEdit: TextEditorEdit) => {
      textEditorEdit.replace(line.range, content);
    })
    .then(() => {
      commands.executeCommand('cursorEnd');
    });
};

///

export const insertSolidLine: Action = (line, lang) => {
  const rendered = renderComment('line', line.text, lang);
  const content = wrapWithLineBreaker(rendered);

  window.activeTextEditor
    .edit((textEditorEdit: TextEditorEdit) => {
      textEditorEdit.insert(line.range.start, content);
    })
    .then(() => {
      commands.executeCommand('cursorHome');
    });
};
