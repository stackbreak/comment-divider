import { window, TextEditor } from 'vscode';

import { handleError, checkMultiLineSelection } from './errors';
import { insertSubHeader, insertMainHeader, insertSolidLine } from './actions';
import { Action } from './types';

const getEditorState = (editor: TextEditor) => {
  const selection = editor.selection;

  checkMultiLineSelection(selection);

  const document = editor.document;
  const lang = document.languageId;
  const line = document.lineAt(selection.active.line);

  return {
    line,
    lang
  };
};

const generateCommand = (action: Action) => () => {
  try {
    const editor = window.activeTextEditor;
    if (!editor) return;

    const { lang, line } = getEditorState(editor);
    action(line, lang);
  } catch (e) {
    handleError(e);
  }
};

export const mainHeaderCommand = generateCommand(insertMainHeader);
export const subHeaderCommand = generateCommand(insertSubHeader);
export const solidLineCommand = generateCommand(insertSolidLine);
