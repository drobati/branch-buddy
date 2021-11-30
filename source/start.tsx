import React from "react";
import {Text} from "ink";
import {spawnSync} from 'child_process';

interface Props {
    branchName?: string;
}

export default function Start({branchName}: Props) {
    if (!branchName) {
        return <Text>No branch name provided.</Text>;
    }

    const commands = [
        ['git', ['checkout', '-b', branchName]],
        ['git', ['push', '-u', 'origin', branchName]],
    ];

    for (const [command, args] of commands) {
        const { stderr, status } = spawnSync(command as string, args as string[])
        // consider using bunyan.debug with a flag from cli for level?
        // console.log({stderr: stderr.toString(), stdout: stdout.toString(), status});
        if (status !== 0) {
            return <Text>{stderr.toString()}</Text>;
        }
    }

    return (<Text>Created Branch and PR.</Text>);
}