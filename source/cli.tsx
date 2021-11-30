#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './ui';

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
		https://link_to_your_pr
		
		$ branch-buddy commit [message]
		Commited all tracked files and pushed to PR.
		https://link_to_your_pr
		
		$ branch-buddy finish
		Set PR to merge.
`);
const props = {command: cli.input[0], options: cli.input[1]}
render(<App {...props} />);

