import { Text } from 'ink';
import React, { useLayoutEffect } from 'react';

interface Props {
  step: number;
  next: () => void;
}

function FinishStep({ step, next }: Props) {
  useLayoutEffect(() => next(), [step]);
  return <Text>Finished command.</Text>;
}

export default FinishStep;
