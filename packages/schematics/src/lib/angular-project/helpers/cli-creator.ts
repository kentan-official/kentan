import { CliFactory } from '../../contracts';

export class CliCreator implements CliFactory {
  constructor(public cli: any, public projectFilePath: string) {}
}
