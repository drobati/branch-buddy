import React from 'react';
import { Text } from 'ink';
import { spawnSync } from 'child_process';
import createCommands from './util';

interface Props {
  message?: string;
}

function Commit({ message }: Props) {
  if (!message) {
    return <Text>No message provided.</Text>;
  }

  const commands = createCommands([
    { value: `git commit -a -m %`, replace: [message] },
    { value: 'git push' },
    { value: 'gh pr create -f -d', failSilently: true },
    { value: 'gh pr view -w' },
  ]);

  for (let i = 0; i < commands.length; i += 1) {
    const { command, args, failSilently } = commands[i];
    console.log(command, args, failSilently);
    const { stderr, status } = spawnSync(command, args);
    if (status !== 0 && !failSilently) {
      return <Text>{stderr.toString()}</Text>;
    }
  }

  return <Text>Committed all tracked files and pushed to PR.</Text>;
}

Commit.defaultProps = {
  message: '',
};

export default Commit;
