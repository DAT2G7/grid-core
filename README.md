![example event parameter](https://github.com/DAT2G7/grid-core/actions/workflows/build.yml/badge.svg?event=push)
![example event parameter](https://github.com/DAT2G7/grid-core/actions/workflows/jest.yml/badge.svg?event=push)

# grid-core

This repository contains the `grid-core` code accompanying AAU cs-23-DAT-2-07's P2 report

This is the computational core that will be served by the grid server and run by the worker in the grid's client.

## Setup

Clone repository

```sh
git clone https://github.com/DAT2G7/grid-core
```

Install dependencies

```sh
npm install
```

Build project

```sh
npm run build
```

As the core is made to be executed by the grid client, it has no self-contained `run` command
