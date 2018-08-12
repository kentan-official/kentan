import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Yarn } from './yarn';

const spawnMock = jest.fn();
spawnMock.mockReturnValue({
  on: () => {}
});

describe('When installing @kentan-official/core', () => {
  let testComplete$$: Subject<any>;

  beforeEach(() => (testComplete$$ = new Subject()));

  it('should execute "npm install --save-dev @kentan-official/core"', () => {
    const npm = new Yarn({ spawn: spawnMock } as any);
    npm
      .installDev(['@kentan-official/core'])
      .pipe(takeUntil(testComplete$$))
      .subscribe();

    expect(spawnMock).toHaveBeenCalledWith(
      'yarn',
      ['add', '--save-dev', '@kentan-official/core'],
      { shell: true, stdio: 'inherit' }
    );
  });

  it('should execute "npm install --save-dev package1 package2"', () => {
    const npm = new Yarn({ spawn: spawnMock } as any);

    npm
      .installDev(['package1', 'package2'])
      .pipe(takeUntil(testComplete$$))
      .subscribe();

    expect(spawnMock).toHaveBeenCalledWith(
      'yarn',
      ['add', '--save-dev', 'package1 package2'],
      { shell: true, stdio: 'inherit' }
    );
  });

  afterEach(() => {
    testComplete$$.next();
    testComplete$$.complete();
  });
});
