const log = { info: jest.fn() };

export const mockLogger = {
  factory: { createConsoleLogger: () => log },
  log
};