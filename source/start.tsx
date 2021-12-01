import React from 'react';
import { Text } from 'ink';
import { spawnSync } from 'child_process';

interface Props {
  branchName?: string;
}

function Start({ branchName }: Props) {
  if (!branchName) {
    return <Text>No branch name provided.</Text>;
  }

  const commands = [
    ['git', ['checkout', '-b', branchName]],
    ['git', ['push', '-u', 'origin', branchName]],
  ];

  for (let i = 0; i < commands.length; i += 1) {
    const [command, args] = commands[i];
    const { stderr, status } = spawnSync(command as string, args as string[]);
    // Consider using bunyan.debug with a flag from cli for level?
    // Debug => console.log({stderr: stderr.toString(), stdout: stdout.toString(), status});
    if (status !== 0) {
      return <Text>{stderr.toString()}</Text>;
    }
  }

  return <Text>Created Branch and PR.</Text>;
}

Start.defaultProps = {
  branchName: '',
};

export default Start;
