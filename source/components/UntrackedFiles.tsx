import React, { useState } from 'react';
import { Text } from 'ink';
import { spawnSync } from 'child_process';
import MultiSelect from './MultiSelect';

interface UntrackedFilesProps {
  files: string[];
}

function UntrackedFiles({ files }: UntrackedFilesProps) {
  const [untrackedFiles, setUntrackedFiles] = useState([]);

  if (untrackedFiles.length === 0) {
    if (files.length > 5) {
      // TODO: Prompt to continue
      return <Text>There are lots of untracked files. Continue?</Text>;
    }
    if (files.length > 0) {
      const items = files.map((file) => ({ label: file, value: file }));
      return <MultiSelect label="Select which files to track:" items={items} onSubmit={setUntrackedFiles} />;
    }
  } else {
    // Track the untracked files using spawnSync.
    for (let i = 0; i < untrackedFiles.length; i += 1) {
      const file = untrackedFiles[i].value;
      const { stderr, status } = spawnSync('git', ['add', file]);
      if (status !== 0) {
        return <Text>Error tracking file: {stderr.toString()}</Text>;
      }
    }
    return <Text>Added tracked files.</Text>;
  }
}

export default UntrackedFiles;
