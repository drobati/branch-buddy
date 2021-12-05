import React from 'react';
import { Box, Text } from 'ink';

import Start from './start';
import Commit from './commit';
import Finish from './finish';

interface PropTypes {
  command?: string;
  options?: string[];
  help: string;
}

function App({ command, options, help }: PropTypes): JSX.Element {
  if (!command || !['start', 'commit', 'finish'].includes(command)) {
    return <Text>{help}</Text>;
  }

  const component = {
    start: <Start branchName={options ? options[0] : undefined} />,
    commit: <Commit message={options ? options.join(' ') : undefined} />,
    finish: <Finish />,
  }[command];

  return <Box>{component}</Box>;
}

App.defaultProps = {
  command: '',
  options: [],
};

export default App;
