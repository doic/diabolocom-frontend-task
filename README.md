# Diabolocom Frontend Task

This project is a demonstration of specific components development using [ViteJS](https://vitejs.dev/), [VueJS](https://vuejs.org/), [TypeScript](https://www.typescriptlang.org/) and [TailwindCSS](https://tailwindcss.com/).

The component are also built as web components.

The full requirements are detailed [here](REQUIREMENTS.md).

The whole development process is detailed [here](DEVELOPMENT_PROCESS.md).

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Project Setup

First, clone this repo:

```sh
gh repo clone doic/diabolocom-frontend-task
```

Install all dependencies:

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Build Options

This command will build both Vue components and Web components:

```sh
npm run build
```

You can choose which components to build:

```sh
# Build only Vue components:
npm run build-vue

# Build only Web components:
npm run build-wc
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
