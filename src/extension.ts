import { commands, workspace, ExtensionContext } from 'vscode';
import Main from './main';

const main = new Main(workspace.getConfiguration('fastSnippet').get('template') || {});

export function activate(context: ExtensionContext) {
  const disposable = commands.registerCommand('fast-snippet.start', () => {
    main.showInput().then(() => {
      main.showOption();
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
