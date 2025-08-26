# VS Code Tagged Comment Extension

VS Code Tagged Comment is a TypeScript extension that helps developers add personalized tagged comments to their code with customizable templates including variables like dates and user-entered text.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Quick Validation
- **Run validation script**: `./validate-env.sh` -- validates the entire build environment and all key commands in ~10 seconds.

### Bootstrap and Build
- **Install dependencies**: `npm install` -- takes 2-15 seconds depending on cache. NEVER CANCEL. Set timeout: 60+ seconds.
- **Build the extension**: `npm run build` -- takes 2 seconds using webpack in development mode. Set timeout: 30+ seconds.
- **Production build**: `npm run vscode:prepublish` -- takes 2 seconds, creates minified bundles. Set timeout: 30+ seconds.
- **Watch mode**: `npm run watch` -- starts webpack in watch mode, rebuilds in ~160ms on file changes. NEVER CANCEL when developing. Set timeout: 60+ seconds for initial start.
- **TypeScript compilation only**: `npm run compile` -- compiles TypeScript to JavaScript in `out/` directory, takes ~1 second. Set timeout: 30+ seconds.

### Linting and Code Quality
- **Lint the code**: `npm run lint` -- runs ESLint on TypeScript files, takes <1 second. Set timeout: 30+ seconds.
- Always run `npm run lint` before committing changes to ensure code quality.
- The project uses ESLint with TypeScript configuration extending 'vscode-ext'.

### Testing
- **Full test suite**: `npm run test` -- DOES NOT WORK due to network connectivity issues downloading VS Code for integration tests.
- **Test compilation**: `npm run test-compile` -- compiles TypeScript and builds webpack bundles for testing.
- **Manual testing**: Use VS Code development mode with F5 or "Launch Extension" configuration in `.vscode/launch.json`.
- Tests are located in `src/test/` using Mocha framework with VS Code test runner.

### Development Workflow
- **Start development**: 
  1. `npm install` (first time only)
  2. `npm run watch` to start auto-rebuilding
  3. Open in VS Code and press F5 to launch extension host for testing
- **Key project structure**:
  - `src/extension.ts` - Main extension code with command registration and core logic
  - `package.json` - Extension manifest with commands, configuration, and dependencies
  - `webpack.config.js` - Build configuration for both Node.js and web targets
  - `dist/` - Webpack build output (extension-node.js, extension-web.js)
  - `out/` - TypeScript compilation output
  - `.vscode/` - VS Code debugging and task configurations

## Validation

### Manual Testing Scenarios
After making changes, always test the extension functionality:

1. **Basic tag insertion**:
   - Open any code file in the extension development host
   - Use Ctrl+Alt+M (Cmd+Alt+M on Mac) or Command Palette > "Tagged: Add a Tagged Comment"
   - Enter a test tag (e.g., "BUG")
   - Verify comment appears with current date: `// DD/MM/YYYY - TAG: BUG`

2. **Tag above current line**:
   - Use Command Palette > "Tagged: Add a Tagged Comment Line Above"
   - Verify comment appears on line above cursor with proper indentation

3. **Re-tag functionality**:
   - Use Ctrl+Alt+Shift+M (Cmd+Alt+Shift+M on Mac) or "Tagged: Re-Add the Previously Tagged Comment"
   - Verify the last entered tag is re-inserted

4. **Configuration testing**:
   - Modify `tagged.tagString` setting in VS Code settings
   - Test that custom template works with variables: `#day`, `#month`, `#year`, `#enteredText`

### Build Validation
- Always run `npm run build` and verify both `dist/extension-node.js` and `dist/extension-web.js` are created successfully.
- Run `npm run lint` and fix any warnings before committing.
- The extension supports both desktop VS Code (Node.js target) and VS Code Web (WebWorker target).

## Build Times and Timeouts

- **npm install**: 2-15 seconds depending on cache - NEVER CANCEL. Set timeout: 60+ seconds.
- **npm run build**: 2 seconds - NEVER CANCEL. Set timeout: 30+ seconds.
- **npm run vscode:prepublish**: 2 seconds - NEVER CANCEL. Set timeout: 30+ seconds.
- **npm run watch**: starts in 2 seconds, rebuilds in 160ms - NEVER CANCEL during development. Set timeout: 60+ seconds.
- **npm run lint**: <1 second. Set timeout: 30+ seconds.
- **npm run compile**: ~1 second. Set timeout: 30+ seconds.
- **npm run test**: FAILS due to network connectivity - do not use
- **./validate-env.sh**: ~10 seconds for full validation. Set timeout: 60+ seconds.

**CRITICAL**: Always set appropriate timeouts for all commands. Even though most complete quickly, network conditions or system load may cause delays.

## Project Architecture

### Key Files and Locations
- **Main extension entry**: `src/extension.ts` - Contains activate function and all command handlers
- **Commands implemented**:
  - `tagged-comment.tag` - Add tagged comment at cursor
  - `tagged-comment.tagAbove` - Add tagged comment line above cursor  
  - `tagged-comment.reTag` - Re-add previously entered tag
  - `tagged-comment.reTagAbove` - Re-add previously entered tag above cursor
- **Configuration**: Extension exposes `tagged.tagString` setting for custom comment templates
- **Localization**: Supports internationalization with files in `l10n/` and `package.nls.json`
- **Build outputs**: 
  - `dist/extension-node.js` - Node.js desktop VS Code target
  - `dist/extension-web.js` - WebWorker VS Code web target

### Extension Variables
The extension supports these template variables:
- `#enteredText` - The tag text entered by user
- `#day` - Current day (zero-padded)
- `#month` - Current month (zero-padded) 
- `#year` - Current year (4-digit)

### Development Tools
- **VS Code tasks**: Use Ctrl+Shift+B (Cmd+Shift+B on Mac) to run build tasks defined in `.vscode/tasks.json`
- **Debugging**: Use F5 to launch extension development host with configured launch settings
- **TypeScript**: Project uses TypeScript 4.4+ with strict mode enabled
- **Webpack**: Dual target build (Node.js + WebWorker) for desktop and web VS Code compatibility

## Common Development Tasks

### Adding New Commands
1. Register command in `src/extension.ts` activate function
2. Add command definition to `package.json` contributes.commands section
3. Add localized strings to `package.nls.json`
4. Test in development host with F5

### Modifying Comment Templates
1. Update default template in `package.json` configuration section
2. Modify template processing logic in `tag()` function in `src/extension.ts`
3. Test variable replacement logic manually

### Build and Package
1. `npm run vscode:prepublish` - creates production minified build
2. Use `vsce package` (if vsce is installed) to create .vsix package file
3. Build artifacts are in `dist/` directory

## Known Limitations
- **Integration tests do not work** in this environment due to VS Code download connectivity issues
- Extension can be built and developed but requires VS Code development host for full functionality testing
- Always use manual testing scenarios described above to validate changes
- Web extension target works but has limited API access compared to desktop version