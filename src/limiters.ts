import { ILimiters } from './types';
import { workspace } from 'vscode';
import { EXT_ID } from './constants';

///

const wrapLimiters = (left: string, right: string): ILimiters => ({ left, right });

///

const getLanguageDefaultLimiters = (lang?: string): ILimiters => {
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
      return wrapLimiters('/*', '*/');
  }
};

// waiting for issue: https://github.com/microsoft/vscode/issues/2871
export function getLanguageLimiters(language: string): ILimiters {
  const languageConfig = readLanguagesAssociationsConfiguration("languagesAssociations");
  const languageComment: Object = languageConfig.globalValue;
  let returnLimiters: ILimiters = getLanguageDefaultLimiters(language);

  if (Object.prototype.hasOwnProperty.call(languageComment, language)) {
    returnLimiters = wrapLimiters(languageComment[language][0], languageComment[language][1]);
  }

  return returnLimiters;
}

function readLanguagesAssociationsConfiguration(subConfig: string) {
  const value = workspace.getConfiguration(EXT_ID).inspect(subConfig);
  return value;
}
