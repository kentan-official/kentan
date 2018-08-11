import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Npm } from '@lib/package-managers/npm';

const spawnMock = jest.fn();
spawnMock.mockReturnValue({
  on: () => {}
});

describe('When installing @kentan-official/core', () => {
  let testComplete$$: Subject<any>;

  beforeEach(() => (testComplete$$ = new Subject()));

  it('should execute "npm install --save-dev @kentan-official/core"', () => {
    const npm = new Npm({ spawn: spawnMock } as any);
    npm
      .installDev(['@kentan-official/core'])
      .pipe(takeUntil(testComplete$$))
      .subscribe();

    expect(spawnMock).toHaveBeenCalledWith(
      'npm',
      ['install', '--save-dev', '@kentan-official/core'],
      { shell: true, stdio: 'inherit' }
    );
  });

  afterEach(() => {
    testComplete$$.next();
    testComplete$$.complete();
  });
});
