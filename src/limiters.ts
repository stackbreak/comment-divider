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
      return getLanguageCommentStrV1(lang) || getLanguageCommentStrV2(lang) || getLanguageCommentStrV3(lang) || wrapLimiters('/*', '*/');
  }
};

// waiting for issue: https://github.com/microsoft/vscode/issues/2871
const getLanguageCommentStrV1 = (language: string): ILimiters => {
  const languageConfig = readLanguagesAssociationsConfigurationV1<ILanguagesAssociations[]>();
  let returnLimiters: ILimiters = wrapLimiters('/*', '*/');
  returnLimiters = undefined;

  languageConfig.forEach(element => {
    if (element.language === language) {
      returnLimiters = wrapLimiters(element.startString, element.endString || element.startString);
    }
  });
  return returnLimiters;
};

export function readLanguagesAssociationsConfigurationV1<T>(defaultValue?: T | undefined) {
  const value: T | undefined = workspace
    .getConfiguration(EXT_ID)
    .get<T | undefined>("languagesAssociationsV1", defaultValue);
  return value as T;
}

const getLanguageCommentStrV2 = (language: string): ILimiters => {
  const languageConfig = readLanguagesAssociationsConfigurationV2V3("languagesAssociationsV2");
  const languageComment: Object = languageConfig.globalValue;
  let returnLimiters: ILimiters = wrapLimiters('/*', '*/');
  returnLimiters = undefined;

  if (Object.prototype.hasOwnProperty.call(languageComment, language)) {
    returnLimiters = wrapLimiters(languageComment[language][0], languageComment[language][1] || languageComment[language][0]);
  }

  return returnLimiters;
};

const getLanguageCommentStrV3 = (language: string): ILimiters => {
  const languageConfig = readLanguagesAssociationsConfigurationV2V3("languagesAssociationsV3");
  const languageComment: Object = languageConfig.globalValue;
  let returnLimiters: ILimiters = wrapLimiters('/*', '*/');
  returnLimiters = undefined;

  if (Object.prototype.hasOwnProperty.call(languageComment, language)) {
    returnLimiters = wrapLimiters(languageComment[language].startString, languageComment[language].endString || languageComment[language].startString);
  }

  return returnLimiters;
};

export function readLanguagesAssociationsConfigurationV2V3(subConfig: string) {
  const value = workspace.getConfiguration(EXT_ID).inspect(subConfig);
  return value;
}
