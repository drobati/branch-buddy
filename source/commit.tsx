import React from "react";
import {Text} from "ink";
import {spawnSync} from 'child_process';

interface Props {
    message?: string;
}

export default function Commit({message}: Props) {
    if (!message) {
        return <Text>No message provided.</Text>;
    }

    const commands = [
        ['git', ['commit', '-a', '-m', message]],
        ['git', ['push']],
        ['gh', ['pr', 'create', '-f']],
        ['gh', ['pr', 'view', '-w']]
    ];

    for (const [command, args] of commands) {
        const { stderr, stdout, status } = spawnSync(command as string, args as string[])
        // consider using bunyan.debug with a flag from cli for level?
        console.log({stderr: stderr.toString(), stdout: stdout.toString(), status});
        if (status !== 0) {
            return <Text>{stderr.toString()}</Text>;
        }
    }

    return (<Text>Committed all tracked files and pushed to PR.</Text>);
}