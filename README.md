# nx-python-uv
An NX Plugin for python using uv workspaces


## Getting started
Before you start, make sure you have these tools available on your system:
- node.js (check out [nvm](https://github.com/nvm-sh/nvm))
- python (check out [pyenv](https://github.com/pyenv/pyenv))
- [uv](https://docs.astral.sh/uv/getting-started/installation/)

This plugin was developed using these versions:
- node.js - 20.14.0
- python - 3.10.16
- uv - 0.5.24
- nx - 20.3.3


## Usage
TODO: Instructions on adding this plugin to your NX project

Run the 'init' generator. This creates the base pyproject.toml at the root of the workspace
```
npx nx g @bensivo/python-uv:init 
```

Generate an application
```
npx nx g @bensivo/python-uv:application myapp
```

Generate a library
```
npx nx g @bensivo/python-uv:library mylib
```
