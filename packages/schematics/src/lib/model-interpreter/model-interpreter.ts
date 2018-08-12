import { ModelMetaData } from '../contracts';

export class ModelInterpreter {
  private _testClass = /(class)\s(\w+)\s/g;

  private get _emptyMetaData(): ModelMetaData {
    return { name: '', isClass: false };
  }

  process(content: string): ModelMetaData {
    if (!content) {
      return this._emptyMetaData;
    }

    const [, type = '', name = ''] = this._testClass.exec(content) || [];

    return {
      name,
      isClass: type === 'class'
    };
  }
}
