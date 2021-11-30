import React, {useEffect, useState} from "react";
import { spawn } from 'child_process';
import {Text} from "ink";

interface Props {
    branchName?: string;
}

export default function Start({ branchName }: Props) {
    if (!branchName) {
        return <Text>No branch name provided.</Text>;
    }
    const [ error, setError ] = useState('');

    useEffect(() => {
        const checkout = spawn('git', ['checkout', '-b', branchName]);
        checkout.stderr.on('data', (data) => {
            setError(data.toString());
        });
        const push = spawn('git', ['push', '-u', 'origin', branchName]);
        push.stderr.on('data', (data) => {
            setError(data.toString());
        });
        const pullRequest = spawn('gh', ['pr', 'create', '-b', branchName, '-f']);
        pullRequest.stderr.on('data', (data) => {
            setError(data.toString());
        });
        const open = spawn('gh', ['pr', 'view', '-w'])
        open.stderr.on('data', (data) => {
            setError(data.toString());
        });
    }, [error])

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <Text>Created Branch and PR.</Text>
    );
}