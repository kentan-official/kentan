import { fsCliConfigurationMock } from '@lib/test';
import { GlobalCliConfiguration } from '@lib/angular-project/global-cli-configuration';

describe('When no global configuration exists', () => {
  it('should default to npm', () => {
    const mock = fsCliConfigurationMock();
    const configuration = new GlobalCliConfiguration(mock as any);
    const command = configuration.readPackageManager();

    expect(command).toBe('npm');
  });
});

describe('When a global configures a preferred package manager', () => {
  it('should yield the package manager', () => {
    const mock = fsCliConfigurationMock({ cli: { packageManager: 'pnpm' } });
    const configuration = new GlobalCliConfiguration(mock as any);
    const command = configuration.readPackageManager();

    expect(command).toBe('pnpm');
  });
});
