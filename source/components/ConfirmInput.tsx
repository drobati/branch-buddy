import React from 'react';
import { Box, Text, useInput } from 'ink';

interface Props {
  label: string;
  onSubmit: (input: string, key?: object) => void;
}

function ConfirmInput({ label, onSubmit }: Props) {
  useInput(onSubmit);
  return (
    <Box flexDirection="column">
      <Text>{label}</Text>
    </Box>
  );
}

export default ConfirmInput;
