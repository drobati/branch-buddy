import React, { useState } from 'react';
import { Box, Text } from 'ink';
import InkConfirmInput from 'ink-confirm-input';

interface Props {
  label: string;
  onSubmit: (value: boolean) => void;
}

function ConfirmInput({ label, onSubmit }: Props) {
  const [value, setValue] = useState('');
  return (
    <Box flexDirection="column">
      <Text>{label}</Text>
      <InkConfirmInput isChecked value={value} onChange={setValue} onSubmit={onSubmit} />
    </Box>
  );
}

export default ConfirmInput;
