import React from 'react';
import { Text } from 'ink';
import { spawnSync } from 'child_process';

interface Props {
  message?: string;
}

function Commit({ message }: Props) {
  if (!message) {
    return <Text>No message provided.</Text>;
  }

  const commands = [
    ['git', ['commit', '-a', '-m', message]],
    ['git', ['push']],
    ['gh', ['pr', 'create', '-f'], true],
    ['gh', ['pr', 'view', '-w']],
  ];

  for (let i = 0; i < commands.length; i += 1) {
    const [command, args, failSilently] = commands[i];
    const { stderr, status } = spawnSync(command as string, args as string[]);
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
