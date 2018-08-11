import { tags, terminal as color } from '@angular-devkit/schematics/node_modules/@angular-devkit/core';

export function Warning(message: string) {
  return tags.oneLine`  ${color.bgYellow(color.black('WARNING'))} ${message}`;
}
