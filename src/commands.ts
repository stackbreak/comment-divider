import { window, Selection, TextDocument, TextEditor, TextLine } from 'vscode';

import { handleError, checkMultiLineSelection } from './errors';
import { insertSubHeader, insertMainHeader, insertSolidLine } from './actions';
import { Action } from './types';

/* --------------------------- Command Generator ---------------------------- */

const getEditorState = (editor: TextEditor) => {
  const selection: Selection = editor.selection;

  checkMultiLineSelection(selection);

  const document: TextDocument = editor.document;
  const lang: string = document.languageId;
  const line: TextLine = document.lineAt(selection.active.line);

  return {
    line,
    lang
  };
};

///

const generateCommand = (action: Action) => () => {
  try {
    const editor: TextEditor = window.activeTextEditor;
    if (!editor) return;

    const { lang, line } = getEditorState(editor);
    action(line, lang);
  } catch (e) {
    handleError(e);
  }
};

/* ------------------------------ Commands List ----------------------------- */

export const mainHeaderCommand = generateCommand(insertMainHeader);
export const subHeaderCommand = generateCommand(insertSubHeader);
export const solidLineCommand = generateCommand(insertSolidLine);
