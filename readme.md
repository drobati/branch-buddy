# branch-buddy

## Install

Has a dependency on git and gh.

```bash
$ npm install --global @drobati/branch-buddy
```

## CLI

```
$ branch-buddy --help

  Usage
    $ branch-buddy start <featureName>
    $ branch-buddy commit <message>
    $ branch-buddy finish

  Args
    subcommand
    options

  Examples
    $ branch-buddy start <featureName>
    Created Branch and PR.
    https://link_to_your_pr
    
    $ branch-buddy commit <message>
    Committed all tracked files and pushed to PR.
    https://link_to_your_pr
    
    $ branch-buddy finish
    Merged PR and deleted branch.
    
    $ alias bs='branch-buddy start'
    $ alias bc='branch-buddy commit'
    $ alias bf='branch-buddy finish'
```
