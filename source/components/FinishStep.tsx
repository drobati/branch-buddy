import { Text } from 'ink';
import React, { useLayoutEffect } from 'react';

interface Props {
  label: string;
  step: number;
  next: () => void;
}

function FinishStep({ label = 'Command Finished.', step, next }: Props) {
  useLayoutEffect(() => next(), [step]);
  return <Text>{label}</Text>;
}

export default FinishStep;
