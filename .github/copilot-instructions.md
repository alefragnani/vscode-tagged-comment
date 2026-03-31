# VS Code Tagged Comment Extension

Always reference these instructions first and fall back to additional search or terminal commands only when project files do not provide enough context.

## Project Overview

VS Code Tagged Comment is a TypeScript extension that helps developers add personalized tagged comments to their code with customizable templates including variables like dates and user-entered text.

## Technology Stack

- Language: TypeScript
- Runtime: VS Code Extension API (Node + Web)
- Bundler: Webpack 5
- Linting: ESLint (`eslint-config-vscode-ext`)
- Testing: Mocha + `@vscode/test-electron`

## Working Effectively

Bootstrap and local setup:

```bash
npm install
```

Build and development quickstart:

```bash
npm run build
npm run lint
```

- Use `npm run watch` during active development.
- Use VS Code "Launch Extension" (F5) to validate behavior in Extension Development Host.
- Expected command timings are usually under 10 seconds.
- Never cancel `npm install`, `npm run watch`, or `npm test` once started.
## Build and Development Commands

- `npm run compile` - TypeScript compilation
- `npm run build` - Webpack development build
- `npm run watch` - Continuous webpack build
- `npm run lint` - ESLint validation
- `npm run test` - Full test suite
- `npm run vscode:prepublish` - Production build

## Testing and Validation

Manual testing scenarios:

1. Add tagged comment via command or keybinding and verify output format.
2. Add tagged comment above current line and verify indentation.
3. Re-add previous tag and confirm correct value reuse.
4. Validate custom `tagged.tagString` with `#enteredText`, `#day`, `#month`, `#year` variables.

Network note:
- `npm run test` may fail in restricted environments due to VS Code download connectivity.

## Project Structure and Key Files

```
src/
├── extension.ts          # Command registration and tag generation logic
└── test/                 # Test suite

l10n/                     # Runtime localization files
dist/                     # Build artifacts (extension-node.js, extension-web.js)
out/                      # Compiled TypeScript files
```

## Coding Conventions and Patterns

### Indentation

- Use spaces, not tabs.
- Use 4 spaces for indentation.

### Naming Conventions

- Use PascalCase for `type` names
- Use PascalCase for `enum` values
- Use camelCase for `function` and `method` names
- Use camelCase for `property` names and `local variables`
- Use whole words in names when possible

### Types

- Do not export `types` or `functions` unless you need to share it across multiple components
- Do not introduce new `types` or `values` to the global namespace
- Prefer `const` over `let` when possible.

### Strings

- Prefer double quotes for new code; some existing files may still use single quotes.
- User-facing strings use two localization mechanisms:
  - **Manifest contributions** (commands, settings, walkthrough metadata): use `%key%` placeholders in `package.json`, with translations in `package.nls.json` and `package.nls.{LANGID}.json`. Do **not** use `l10n.t` for these.
  - **Runtime messages** (shown from extension code): use `l10n.t("message")`, with translations in `l10n/bundle.l10n.json` and `l10n/bundle.l10n.{LANGID}.json`.
- Externalized strings must not use string concatenation. Use placeholders instead (`{0}`).

### Code Quality

- All production source files under `src/` (excluding tests under `src/test`) must include the standard project copyright header
- Prefer `async` and `await` over `Promise` and `then` calls
- All user facing messages must be localized using the applicable localization framework (for example `l10n.t` method)
- Keep imports organized: VS Code first, then internal modules.
- Use semicolons at the end of statements.
- Keep changes minimal and aligned with existing style.

### Import Organization

- Import VS Code API first: `import * as vscode from "vscode"`
- Group related imports together
- Use named imports for specific VS Code types
- Import from local modules using relative paths

## Extension Features and Configuration

### Key Features
1. **Tagged Comment**: Add a tagged comment at the current line or above.

### Important Settings
- `tagged.tagString`: supports variables `#enteredText`, `#day`, `#month`, `#year`)

## Dependencies and External Tools

- No external runtime tools are required beyond standard extension toolchain.
- Uses `@vscode/test-electron` for integration testing.

## Troubleshooting and Known Limitations

- Integration tests may fail in restricted networks (VS Code download endpoint).
- If watch mode hangs, stop and run `npm run build` once.
- Validate command behavior in Extension Host when modifying template logic.

## CI and Pre-Commit Validation

Before committing:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Run `npm run test-compile`.
4. Validate manual command scenarios in Extension Host.

## Common Tasks

1. Add/update commands in `src/extension.ts` and `package.json` contributions.
2. Update default template behavior and variable replacement logic.
3. Keep localization keys updated in `package.nls*.json` and `l10n/`.
