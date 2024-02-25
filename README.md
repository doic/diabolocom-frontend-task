# Diabolocom Frontend Task

![Vue page](./docs/vue_page.png)

This project is a demonstration of specific components development using [ViteJS](https://vitejs.dev/), [VueJS](https://vuejs.org/), [TypeScript](https://www.typescriptlang.org/) and [TailwindCSS](https://tailwindcss.com/).

- [Full requirements for the task](docs/REQUIREMENTS.md)
- [Development process](docs/DEVELOPMENT_PROCESS.md)
- [How to use the components](docs/HOWTO.md)

## Project Setup

First, clone this repo:

```sh
# With GitHub CLI
gh repo clone doic/diabolocom-frontend-task

# Or with git CLI
git clone https://github.com/doic/diabolocom-frontend-task.git
```

Install all dependencies:

```sh
npm install
```

### Run Development Server

If you want to tweak the components

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
# Runs the tests only for Vue components
npm run test:e2e -- tests/example.spec.ts
```

### See the components live

| [![Vue page](./docs/vue_page.png)](https://diabolocom-frontend-task.vercel.app/)  | [![Wc page](./docs/wc_page.png)](https://diabolocom-frontend-task-wc.vercel.app/)  |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| <center>[VueJs components](https://diabolocom-frontend-task.vercel.app/)</center> | <center>[Web components](https://diabolocom-frontend-task-wc.vercel.app/)</center> |
