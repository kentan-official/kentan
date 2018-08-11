import { CliFactory } from '@lib/contracts';

export class CliCreator implements CliFactory {
  constructor(public cli: any, public projectFilePath: string) {}
}
