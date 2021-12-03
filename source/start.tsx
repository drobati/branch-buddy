import React from 'react';
import { Text } from 'ink';
import { spawnSync } from 'child_process';
import createCommands from './util';

interface Props {
  branchName?: string;
}

function Start({ branchName }: Props) {
  if (!branchName) {
    return <Text>No branch name provided.</Text>;
  }

  const commands = createCommands([
    { value: `git checkout -b ${branchName}` },
    { value: `git push -u origin ${branchName}` },
  ]);

  for (let i = 0; i < commands.length; i += 1) {
    const { command, args, failSilently } = commands[i];
    const { stderr, status } = spawnSync(command, args);
    if (status !== 0 && !failSilently) {
      return <Text>{stderr.toString()}</Text>;
    }
  }

  return <Text>Created Branch and PR.</Text>;
}

Start.defaultProps = {
  branchName: '',
};

export default Start;
