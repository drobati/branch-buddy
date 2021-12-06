interface CommandsInput {
  value: string;
  replace?: string[];
  failSilently?: boolean;
  label?: string;
}

interface CommandsOutput {
  command: string;
  args: string[];
  failSilently?: boolean;
  label?: string;
}

const createCommands = (commands: Array<CommandsInput>): Array<CommandsOutput> =>
  commands.map((command) => {
    const parts = command.value.split(' ');
    const args = parts.slice(1).map((arg) => (arg === '%' ? command.replace.pop() : arg));
    return {
      command: parts[0],
      args,
      failSilently: command.failSilently || false,
      label: command.label,
    };
  });

export default createCommands;
