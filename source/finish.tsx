import React from "react";
import {Text} from "ink";
import {spawnSync} from 'child_process';

export default function Finish() {
    const commands = [
        ['gh', ['merge', '--auto', '-d', '-m']],
    ];

    for (const [command, args] of commands) {
        const { stderr, stdout, status } = spawnSync(command as string, args as string[])
        // consider using bunyan.debug with a flag from cli for level?
        console.log({stderr: stderr.toString(), stdout: stdout.toString(), status});
        if (status !== 0) {
            return <Text>{stderr.toString()}</Text>;
        }
    }

    return (<Text>Set PR to merge and deleted branch.</Text>);
}