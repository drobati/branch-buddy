import { Box, Text } from 'ink';
import React from 'react';
import InkMultiSelect, { ListedItem } from 'ink-multi-select';

interface Props {
  label: string;
  items: ListedItem[];
  onSubmit: (item: ListedItem[]) => void;
}

function MultiSelect({ label, items, onSubmit }: Props) {
  return (
    <Box flexDirection="column">
      <Text>{label}</Text>
      <InkMultiSelect items={items} onSubmit={onSubmit} />
    </Box>
  );
}

export default MultiSelect;
