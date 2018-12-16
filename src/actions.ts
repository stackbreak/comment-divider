/* ========================================================================== */
/*                                   ACTIONS                                  */
/* ========================================================================== */

import { commands, TextEditor, TextEditorEdit, TextLine, Range, Position } from 'vscode';

import { renderSubHeader, renderMainHeader, renderLine } from './renders';
import { checkEmptyLine } from './errors';
import { NEW_LINE_SYM } from './constants';

///

export type Action = (editor: TextEditor, line: TextLine, lang: string) => void;

interface IMargins {
  top: boolean;
  bottom: boolean;
}

/* --------------------------------- Margins -------------------------------- */

const computeMargins = (line: TextLine, editor: TextEditor): IMargins => {
  const isEmptyLine = (lineNum: number) =>
    editor.document.lineAt(lineNum).isEmptyOrWhitespace;

  const lastLineNum = editor.document.lineCount - 1;
  const prevLineNum = line.lineNumber - 1;
  const nextLineNum = line.lineNumber + 1;
  const margins = {
    top: false,
    bottom: false
  };

  margins.top = prevLineNum >= 0 && !isEmptyLine(prevLineNum);
  margins.bottom = nextLineNum <= lastLineNum && !isEmptyLine(nextLineNum);

  return margins;
};

///

const wrapMargins = (rendered: string, margins: IMargins): string => {
  const before: string = margins.top ? NEW_LINE_SYM : '';
  const after: string = margins.bottom ? NEW_LINE_SYM : '';

  return before + rendered + after;
};

/* --------------------------------- Inserts -------------------------------- */

export const insertSubHeader: Action = (editor, line, lang) => {
  checkEmptyLine(line);

  const currentText = line.text.trim();
  const rendered = renderSubHeader(currentText, lang);
  const margins = computeMargins(line, editor);
  const content = wrapMargins(rendered, margins);

  editor
    .edit((textEditorEdit: TextEditorEdit) => {
      textEditorEdit.replace(line.range, content);
    })
    .then(() => {
      commands.executeCommand('cursorDown');
    });
};

///

export const insertMainHeader: Action = (editor, line, lang) => {
  checkEmptyLine(line);

  const currentText = line.text.trim();
  const rendered = renderMainHeader(currentText, lang);
  const margins = computeMargins(line, editor);
  const content = wrapMargins(rendered, margins);

  let thenable = editor.edit((textEditorEdit: TextEditorEdit) => {
    textEditorEdit.replace(line.range, content);
  });

  for (let i = 0; i < 3; i++) {
    thenable = thenable.then(() => {
      return commands.executeCommand('cursorDown');
    });
  }
};

///

export const insertSolidLine: Action = (editor, line, lang) => {
  const rendered = renderLine(lang);
  const content = rendered + NEW_LINE_SYM;

  editor
    .edit((textEditorEdit: TextEditorEdit) => {
      textEditorEdit.insert(line.range.start, content);
    })
    .then(() => {
      commands.executeCommand('cursorHome');
    });
};
