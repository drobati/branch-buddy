import React from 'react';
import { Text } from 'ink';
import { spawnSync } from 'child_process';
import createCommands from '../libs/util';

function Finish() {
  const commands = createCommands([
    { value: 'gh pr ready', failSilently: true },
    { value: 'gh pr merge --auto -d -m' },
    { value: 'git pull' },
  ]);

  for (let i = 0; i < commands.length; i += 1) {
    const { command, args, failSilently } = commands[i];
    const { stderr, status } = spawnSync(command, args);
    if (status !== 0 && !failSilently) {
      return <Text>{stderr.toString()}</Text>;
    }
  }

  return <Text>Set PR to merge and deleted branch.</Text>;
}

export default Finish;
