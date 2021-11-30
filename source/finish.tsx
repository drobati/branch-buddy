import React from "react";
import {Text} from "ink";
import {spawnSync} from 'child_process';

export default function Finish() {
    const commands = [
        ['gh', ['pr', 'merge', '--auto', '-d', '-m']],
        ['git', ['pull']]
    ];

    for (const [command, args] of commands) {
        const { stderr, status } = spawnSync(command as string, args as string[])
        if (status !== 0) {
            return <Text>{stderr.toString()}</Text>;
        }
    }

    return (<Text>Set PR to merge and deleted branch.</Text>);
}