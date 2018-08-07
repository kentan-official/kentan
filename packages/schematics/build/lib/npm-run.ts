import { exec } from 'child_process';

export function npmRun(script: string) {
  return new Promise((resolve, reject) => {
    exec(`npm run ${script}`, (err, stdout, stderr) => {
      const error = readErr(err, stderr);

      return !!error ? reject(error) : maybeLog(stdout).then(() => resolve());
    });
  });
}

/**
 * Currently a check is needed for stderr.
 * Jest outputs to stderr even when there is no error.
 * (see: https://github.com/facebook/jest/issues/5064)
 *
 * @param err
 * @param stderr
 */
function readErr(err: Error|null, stderr: string) {
  const errorRegex = /\b()\b/
  if (err) {
    console.log('ERR', err);
    return err;
  } else if (stderr.includes('err')) {
    console.log('STDERR', stderr);
    return stderr;
  }

  return null;
}

function maybeLog(message: string) {
  return new Promise(resolve => {
    if (message) {
      console.log(message);
    }

    return resolve();
  });
}
