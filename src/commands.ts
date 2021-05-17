import { window, TextEditor } from 'vscode';

import { handleError, checkMultiLineSelection } from './errors';
import { insertDividerAction } from './actions';
import { PresetId } from './types';

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

const generateCommand = (type: PresetId) => () => {
  try {
    const editor = window.activeTextEditor;
    if (!editor) return;

    const { lang, line } = getEditorState(editor);
    insertDividerAction(type, line, lang);
  } catch (e) {
    handleError(e);
  }
};

export const mainHeaderCommand = generateCommand('mainHeader');
export const subHeaderCommand = generateCommand('subheader');
export const solidLineCommand = generateCommand('line');
