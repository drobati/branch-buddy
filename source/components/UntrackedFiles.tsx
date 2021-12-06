import React from 'react';
import { useApp } from 'ink';
import { spawnSync } from 'child_process';
import MultiSelect from './MultiSelect';
import ConfirmInput from './ConfirmInput';

interface UntrackedFilesProps {
  files: string[];
  next: () => void;
}

function UntrackedFiles({ files, next }: UntrackedFilesProps) {
  if (files.length > 5) {
    const label = 'There are lots of untracked files. Continue? (Y/n)';
    const { exit } = useApp();
    const onSubmit = (value: boolean) => {
      if (value === true) {
        next();
      } else {
        exit();
      }
    };
    return <ConfirmInput label={label} onSubmit={onSubmit} />;
  }
  if (files.length > 0) {
    const items = files.map((file) => ({ label: file, value: file }));
    const onSubmit = (untrackedFiles) => {
      if (untrackedFiles.length === 0) {
        next();
      } else {
        const { stderr, status } = spawnSync('git', ['add', untrackedFiles.map((f) => f.value).join(' ')]);
        if (status !== 0) {
          throw new Error(`Error tracking files: ${stderr.toString()}`);
        }
        next();
      }
    };
    return <MultiSelect label="Select which files to track:" items={items} onSubmit={onSubmit} />;
  }
}

export default UntrackedFiles;
