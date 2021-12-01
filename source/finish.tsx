import React from 'react';
import { Text } from 'ink';
import { spawnSync } from 'child_process';

function Finish() {
  const commands = [
    ['gh', ['pr', 'merge', '--auto', '-d', '-m']],
    ['git', ['pull']],
  ];

  for (let i = 0; i < commands.length; i += 1) {
    const [command, args] = commands[i];
    const { stderr, status } = spawnSync(command as string, args as string[]);
    if (status !== 0) {
      return <Text>{stderr.toString()}</Text>;
    }
  }

  return <Text>Set PR to merge and deleted branch.</Text>;
}

export default Finish;
