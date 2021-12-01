import { render } from 'ink-testing-library';
import * as React from 'react';
import App from './ui';

describe('CLI', () => {
  const help = 'Usage: cli [options]';
  it('should run', () => {
    const rendered = render(<App help={help} />);
    expect(rendered.lastFrame()).toEqual('Usage: cli [options]');
  });
});
