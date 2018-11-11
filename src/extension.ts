'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "comment-divider" is now active!');

    let disposable = vscode.commands.registerCommand('extension.insertDivider', () => {
        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}
