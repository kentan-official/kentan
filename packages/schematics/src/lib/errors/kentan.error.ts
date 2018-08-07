export class KentanError extends Error {
  constructor(message: string) {
    super(`kentan-schematics: ${message}`);
  }
}
