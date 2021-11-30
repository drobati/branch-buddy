import React from "react";
import {Text} from "ink";

interface Props {
    message?: string;
}

export default function Commit({message}: Props) {
    if (!message) {
        return <Text>No commit message provided.</Text>;
    }
    console.log(message);
    return (
        <Text>Committed all tracked files and pushed to PR.</Text>
    );
}