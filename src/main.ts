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
  public name: string = '';
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

  showInput() {
    return window.showInputBox().then((data) => {
      if (!data) {
        return Promise.reject(new Error('关键字为空'));
      }

      this.name = data;

      return Promise.resolve();
    });
  }

  showOption(option = this.option) {
    const list = option.map((item) => item.label);

    window.showQuickPick(list).then((data) => {
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
    env.clipboard.writeText(replaceName(str, this.name));
  }
}

export default Main;