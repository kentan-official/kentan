/**
 * Mocks readFileSync of fs and returns provided content (see: param content)
 * @param content file content that is returned when any file is read
 */
export function fsCliConfigurationMock(content?: {}) {
  return {
    readFileSync: () => JSON.stringify(content)
  };
}