#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import App from './App';

const cli = meow(`
	Usage
		$ branch-buddy start [featureName]
		$ branch-buddy commit [message]
		$ branch-buddy finish

	  Args
		subcommand
		options

	  Examples
		$ branch-buddy start [featureName]
		Created Branch and PR.

		$ branch-buddy commit [message]
		Committed all tracked files and pushed to PR.

		$ branch-buddy finish
		Set PR to merge and deleted branch.
`);
const command = cli.input[0];
const options = cli.input.slice(1);
const { help } = cli;
render(<App command={command} options={options} help={help} />);
