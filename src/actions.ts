/* -------------------------------------------------------------------------- */
/*                                   ACTIONS                                  */
/* -------------------------------------------------------------------------- */

import { commands, TextEditorEdit, TextLine, window } from 'vscode';

import { renderSubHeader, renderMainHeader, renderLine, wrapMargins } from './renders';
import { checkEmptyLine } from './errors';
import { NEW_LINE_SYM } from './constants';

///

export type Action = (line: TextLine, lang: string) => void;

/* --------------------------------- Inserts -------------------------------- */

export const insertSubHeader: Action = (line, lang) => {
  checkEmptyLine(line);

  const currentText = line.text.trim();
  const rendered = renderSubHeader(currentText, lang);
  const content = wrapMargins(rendered, line);

  window.activeTextEditor
    .edit((textEditorEdit: TextEditorEdit) => {
      textEditorEdit.replace(line.range, content);
    })
    .then(() => {
      commands.executeCommand('cursorEnd');
    });
};

///

export const insertMainHeader: Action = (line, lang) => {
  checkEmptyLine(line);

  const currentText = line.text.trim();
  const rendered = renderMainHeader(currentText, lang);
  const content = wrapMargins(rendered, line);

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
  const rendered = renderLine(lang);
  const content = rendered + NEW_LINE_SYM;

  window.activeTextEditor
    .edit((textEditorEdit: TextEditorEdit) => {
      textEditorEdit.insert(line.range.start, content);
    })
    .then(() => {
      commands.executeCommand('cursorHome');
    });
};
