
# NAME

**mailcow-inwx-connector** this program checks the domains of your mailcow and compares them against your inwx account.

# SYNOPSIS

**mailcow-inwx-connector** [OPTION] 

# DESCRIPTION

**mailcow-inwx-connector** this program checks the domains of your mailcow and compares them against your inwx account. \
Without options the programm runs in dryrun-mode. \
It doesn't change anything

# Options

[**--help**]

show help

[**-v|--verbose**]

show detailed information

[**-d|--domain** url|all]

give name of url or "all" to check all urls

[**-u|--updateRecord**]

update records if needed

[**-c|--createRecord**]

create records if needed

[**-a|--doAll**]

update or create records if needed

# Installation
```bash
# init your project
git clone https://github.com/mxsteini/mailcow-inwx-connector.git
```

## Configuration
As a good starting point get a copy of config.json.dist to config.json and .env.dist .env

```bash
cp .env.dist .env
cp config.json.dist config.json
```

setup .env and config.json

# Usage

First do a dry run

```bash
./bin/mailcow-inwx-connector.js --verbose
```

## FILES

*config.json*\
Contains the configuration.

*.env*
Contains the secrets

## CREDITS

### Mailcow

This is one of the greatest projects I've seen. Please guys, keep on doing a great job.

[mailcow.email](https://mailcow.email/)

The mailcow-api is copied and modified from https://github.com/firstdorsal/mailcow-api

## BUGS

See GitHub Issues: <https://github.com/mxsteini/mailcow-inwx-connector/issues>

## AUTHOR

Michael Stein <info@michaelstein-itb.de>
