import { fileSync } from 'find';
import { readFileSync } from 'fs';
import { Some, None, OptionType } from '../option-type';

export interface ModelSearchResult {
  path: string;
  content: string;
  notFound: boolean;
}

export class ModelFinder {
  find(root: string, name: string): OptionType<ModelSearchResult> {
    const searchResult = fileSync(this._fileQuery(name), root)
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

  private _fileQuery(name: string): RegExp {
    return new RegExp(`${name}.ts$`)
  }
}

export default ModelFinder;
