import React, { useState } from 'react';
import { Text } from 'ink';
import { spawnSync } from 'child_process';
import createCommands from '../libs/util';
import UntrackedFiles from '../components/UntrackedFiles';
import FinishStep from '../components/FinishStep';

interface Props {
  message?: string;
}

function Commit({ message }: Props) {
  const [step, setStep] = useState(0);
  const next = () => setStep(step + 1);

  const commands = createCommands([
    { value: `git ls-files --exclude-standard --others`, label: 'Checking untracked files.' },
    { value: `git commit -a -m %`, replace: [message], label: 'Committing changes.' },
    { value: `git push`, label: 'Pushed changes.' },
    { value: 'gh pr create -f -d', failSilently: true, label: 'Created draft PR.' },
    { value: 'gh pr view -w', label: 'Opened PR.' },
  ]);

  if (!message) {
    return <Text>No message provided.</Text>;
  }

  const { command, args, failSilently, label } = commands[step];
  const { stdout, stderr, status } = spawnSync(command, args);

  if (status !== 0 && !failSilently) {
    return <Text>{stderr.toString()}</Text>;
  }

  if (step === 0) {
    const files = stdout.toString();
    if (files.length > 0) {
      const filesArray = files.split('\n').slice(0, -1);
      return <UntrackedFiles files={filesArray} next={next} />;
    }
    return <FinishStep label={label} step={step} next={next} />;
  }

  if (step > 0 && step < commands.length - 1) {
    return <FinishStep label={label} step={step} next={next} />;
  }

  return <Text>Committed all tracked files and pushed to PR.</Text>;
}

Commit.defaultProps = {
  message: '',
};

export default Commit;
