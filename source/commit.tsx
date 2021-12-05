import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text } from 'ink';
import { spawnSync } from 'child_process';
import createCommands from './util';
import UntrackedFiles from './components/UntrackedFiles';

interface Props {
  message?: string;
}

function Commit({ message }: Props) {
  const [step, setStep] = useState(0);
  useLayoutEffect(() => () => setStep(step + 1));

  const commands = createCommands([
    { value: `git ls-files --exclude-standard --others` },
    { value: 'echo "test"' },
    // { value: `git commit -a -m %`, replace: [message] },
    // { value: 'git push' },
    // { value: 'gh pr create -f -d', failSilently: true },
    // { value: 'gh pr view -w' },
  ]);

  if (!message) {
    return <Text>No message provided.</Text>;
  }

  const { command, args, failSilently } = commands[step];
  const { stdout, stderr, status } = spawnSync(command, args);
  console.log({ stdout: stdout.toString(), stderr: stderr.toString(), status, step });

  if (status !== 0 && !failSilently) {
    return <Text>{stderr.toString()}</Text>;
  }

  if (step === 0) {
    const files = stdout.toString();
    if (files.length > 0) {
      const filesArray = files.split('\n').slice(0, -1);
      return <UntrackedFiles files={filesArray} />;
    }
  }

  if (step === commands.length - 1) {
    return <Text>Committed all tracked files and pushed to PR.</Text>;
  }
  return <Text>Still processing commands...</Text>;
}

Commit.defaultProps = {
  message: '',
};

export default Commit;
