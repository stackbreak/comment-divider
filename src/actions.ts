import { commands, TextEditorEdit, TextLine, window } from 'vscode';

import {
  renderHeader,
  renderLine,
  wrapWithMargins,
  wrapWithLinebreaker
} from './renders';
import { checkEmptyLine } from './errors';
import { Action } from './types';

export const insertMainHeader: Action = (line, lang) => {
  checkEmptyLine(line);

  const rendered = renderHeader('mainHeader', line.text, lang);
  const content = wrapWithMargins(rendered, line);

  window.activeTextEditor
    .edit((textEditorEdit: TextEditorEdit) => {
      textEditorEdit.replace(line.range, content);
    })
    .then(() => {
      commands.executeCommand('cursorEnd');
    });
};

export const insertSubHeader: Action = (line, lang) => {
  checkEmptyLine(line);

  const rendered = renderHeader('subheader', line.text, lang);
  const content = wrapWithMargins(rendered, line);

  window.activeTextEditor
    .edit((textEditorEdit: TextEditorEdit) => {
      textEditorEdit.replace(line.range, content);
    })
    .then(() => {
      commands.executeCommand('cursorEnd');
    });
};

export const insertSolidLine: Action = (line, lang) => {
  const rendered = renderLine(lang);
  const content = wrapWithLinebreaker(rendered);

  window.activeTextEditor
    .edit((textEditorEdit: TextEditorEdit) => {
      textEditorEdit.insert(line.range.start, content);
    })
    .then(() => {
      commands.executeCommand('cursorHome');
    });
};
