import React from 'react';
import {Text} from 'ink';

import Start from './start';
import Commit from './commit';
import Finish from './finish';

interface PropTypes {
  command?: string;
  options?: string;
  help: string
}

export default function App({command, options, help}: PropTypes): JSX.Element {
    if (!command || !['start', 'commit', 'finish'].includes(command)) {
        return <Text>{help}</Text>;
    }

    const component = {
        start: <Start branchName={options} />,
        commit: <Commit message={options}/>,
        finish: <Finish/>,
    }[command];

    return (<Text>{component}</Text>);
};

module.exports = App;
