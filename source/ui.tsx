import React from 'react';
import {Text} from 'ink';

import Start from './start';
import Commit from './commit';
import Finish from './finish';

interface PropTypes {
  command?: string;
  options?: string;
}

export default function App({command, options}: PropTypes): JSX.Element {
    if (!command) {
        return <Text>No command provided.</Text>
    }

    const component = {
        start: <Start branchName={options} />,
        commit: <Commit message={options}/>,
        finish: <Finish/>,
    }[command];

    return (<Text>{component}</Text>);
};

module.exports = App;
