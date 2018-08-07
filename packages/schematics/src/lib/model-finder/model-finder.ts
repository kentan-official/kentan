import { fileSync } from 'find';
import { readFileSync } from 'fs';
import { Some } from '../option-type/some';
import { None } from '../option-type/none';
import { OptionType } from '../option-type/option-type';

export interface ModelSearchResult {
  path: string;
  content: string;
  notFound: boolean;
}

export class ModelFinder {
  private readonly _testFile = new RegExp(`${name}.ts$`);

  find(root: string, name: string): OptionType<ModelSearchResult> {
    const searchResult = fileSync(this._testFile, root)
      .map(path => ({
        path,
        content: readFileSync(path).toString(),
        notFound: false
      }))
      .shift();

    return !!searchResult
      ? new Some(searchResult)
      : new None({ explanation: `Could not find "${name}" in "${root}"` });
  }
}

export default ModelFinder;