/* -------------------------------------------------------------------------- */
/*                                 ENTRY POINT                                */
/* -------------------------------------------------------------------------- */

import {
  window,
  commands,
  ExtensionContext,
  Selection,
  TextDocument,
  TextEditor,
  TextLine
} from 'vscode';

import { EXT_ID } from './constants';
import { handleError, checkMultiLineSelection } from './errors';
import { Action, insertSubHeader, insertMainHeader, insertSolidLine } from './actions';

/* --------------------------- Commands Generator --------------------------- */

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

/* ---------------------------------- Main ---------------------------------- */

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand(
      `${EXT_ID}.makeMainHeader`,
      generateCommand(insertMainHeader)
    )
  );

  context.subscriptions.push(
    commands.registerCommand(`${EXT_ID}.makeSubHeader`, generateCommand(insertSubHeader))
  );

  context.subscriptions.push(
    commands.registerCommand(
      `${EXT_ID}.insertSolidLine`,
      generateCommand(insertSolidLine)
    )
  );
}
