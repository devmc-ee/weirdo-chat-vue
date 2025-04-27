# Weirdo Chat

It is a "weirdo" chat simulation. If a conversation is initiated with a polite (single) greeting in English, Estonian, or Russian, the system will try to respond correspondingly.

Otherwise, it will  respond by modifying your message using one of the following methods:

- Reversing the entire sentence.
- Reversing the letters within each word (while preserving the original word order).
- Encoding the message using the SHA-512 algorithm.

The conversation is limited by the VITE_MAX_MESSAGES_IN_POOL value messages.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
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
