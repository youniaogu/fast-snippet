import { window, env } from 'vscode';
import { replaceName } from './utils';

type OptionTypes = {
  children: OptionTypes[];
  value: string | TemplateTypes;
  label: string;
};
type TemplateTypes = {
  [key: string]: string | TemplateTypes;
};

class Main {
  public name: string[] = [];
  public option: OptionTypes[];
  constructor(template: TemplateTypes) {
    this.option = this.getOption(template);
  }

  getOption(obj: TemplateTypes): OptionTypes[] {
    const keys = Object.keys(obj);

    return keys.map((item) => {
      const data = obj[item];

      let children: OptionTypes[] = [];
      if (typeof data !== 'string') {
        children = this.getOption(data);
      }

      return {
        label: item,
        value: data,
        children,
      };
    });
  }

  setName(name: string[]) {
    this.name = name;

    return this;
  }

  showInput() {
    return window.showInputBox({ placeHolder: 'please enter a name' }).then((data) => {
      if (!data) {
        return Promise.reject(new Error('name is empty'));
      }

      this.name = data.split(' ');

      return Promise.resolve(this.name);
    });
  }

  showOption(option = this.option) {
    const list = option.map((item) => item.label);

    window.showQuickPick(list, { placeHolder: 'choose a template' }).then((data) => {
      if (!data) {
        return;
      }

      const template = option[list.indexOf(data)];

      if (typeof template.value === 'string') {
        this.copy(template.value);
        return;
      }

      if (template.children.length > 0) {
        this.showOption(template.children);
      }
    });
  }

  copy(str: string) {
    const texts = this.name.map((name) => {
      if (name === '') {
        return;
      }

      return replaceName(str, name);
    });

    env.clipboard.writeText(texts.join('\n\n'));
  }
}

export default Main;
