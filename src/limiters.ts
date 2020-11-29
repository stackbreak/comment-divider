import { ILimiters, ILanguagesAssociations } from './types';
import { workspace } from 'vscode';
import { EXT_ID } from './constants';

///

const wrapLimiters = (left: string, right: string): ILimiters => ({ left, right });

///

export const getLanguageLimiters = (lang?: string): ILimiters => {
  switch (lang) {
    case 'c':
    case 'cpp':
    case 'csharp':
    case 'css':
    case 'go':
    case 'groovy':
    case 'java':
    case 'javascript':
    case 'javascriptreact':
    case 'jsonc':
    case 'kotlin':
    case 'less':
    case 'objective-c':
    case 'php':
    case 'sass':
    case 'scala':
    case 'stylus':
    case 'sql':
    case 'swift':
    case 'typescript':
    case 'typescriptreact':
      return wrapLimiters('/*', '*/');

    case 'bash':
    case 'dockerfile':
    case 'coffeescript':
    case 'ignore':
    case 'julia':
    case 'makefile':
    case 'perl':
    case 'perl6':
    case 'powershell':
    case 'properties':
    case 'python':
    case 'r':
    case 'ruby':
    case 'shell':
    case 'shellscript':
    case 'yaml':
    case 'yml':
    case 'home-assistant':
      return wrapLimiters('#', '#');

    case 'html':
    case 'markdown':
    case 'plist':
    case 'xaml':
    case 'xml':
    case 'xsl':
      return wrapLimiters('<!--', '-->');

    case 'clojure':
    case 'lisp':
    case 'scheme':
    case 'ini':
    case 'rainmeter':
      return wrapLimiters(';', ';');

    case 'elm':
    case 'haskell':
    case 'lua':
      return wrapLimiters('--', '--');

    case 'erlang':
    case 'latex':
    case 'matlab':
      return wrapLimiters('%', '%');

    case 'jade':
    case 'pug':
      return wrapLimiters('//-', '-//');

    case 'fsharp':
      return wrapLimiters('(*', '*)');

    case 'bat':
      return wrapLimiters('REM', '');

    case 'vb':
      return wrapLimiters("'", "'");

    case 'plaintext':
      return wrapLimiters('#', '#');

    default:
      return getLanguageCommentStr(lang);
  }
};

// waiting for issue: https://github.com/microsoft/vscode/issues/2871
const getLanguageCommentStr = (language: string): ILimiters => {
  const languageConfig = readLanguagesAssociationsConfiguration<ILanguagesAssociations[]>();
  let returnLimiters: ILimiters = wrapLimiters('/*', '*/');

  languageConfig.forEach(element => {
    if (element.language === language) {
      returnLimiters = wrapLimiters(element.startString, element.endString || element.startString);
    }
  });
  return returnLimiters;
};

export function readLanguagesAssociationsConfiguration<T>(defaultValue?: T | undefined) {
  const value: T | undefined = workspace
    .getConfiguration(EXT_ID)
    .get<T | undefined>("languagesAssociations", defaultValue);
  return value as T;
}
