import { commands, TextEditorEdit, window } from 'vscode';

import { render } from './renders';
import { checkEmptyLine } from './errors';
import { Action } from './types';

export const insertDividerAction: Action = (type, line, lang) => {
  if (type === 'mainHeader' || type === 'subheader') {
    checkEmptyLine(line);
  }

  const content = render(type, line.text, lang);

  window.activeTextEditor
    .edit((textEditorEdit: TextEditorEdit) => {
      textEditorEdit.replace(line.range, content);
    })
    .then(() => {
      commands.executeCommand('cursorEnd');
    });
};
