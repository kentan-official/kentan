import { tags, terminal as color } from '@angular-devkit/schematics/node_modules/@angular-devkit/core';

export function Match(message: string) {
  return tags.oneLine`  ${color.bgGreen(color.black('MATCH'))} ${message}`;
}


