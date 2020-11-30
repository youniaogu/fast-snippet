import { window, commands, workspace, ExtensionContext } from 'vscode';
import Main from './main';

const main = new Main(workspace.getConfiguration('fastSnippet').get('template') || {});
const editor = window.activeTextEditor;

export function activate(context: ExtensionContext) {
  const start = commands.registerCommand('fast-snippet.start', () => {
    main.showInput().then(() => {
      main.showOption();
    });
  });
  const menu = commands.registerCommand('fast-snippet.menu', () => {
    if (editor) {
      const names = editor.selections.map((item) => {
        return editor.document.getText(item).split(' ');
      });

      main.setName(names.flat());
      main.showOption();
    }
  });

  context.subscriptions.push(start);
  context.subscriptions.push(menu);
}

export function deactivate() {}
