# Tilr plugin template

The starting point for a [Tilr](https://github.com/tilr-dev) plugin, and a working example:
**hello**, a window with a heading, a button and a click counter kept in the plugin's store, so
it survives a reload. Built on [`@tilr-dev/plugin`](https://www.npmjs.com/package/@tilr-dev/plugin)
(the API types, the build, the e2e harness and the repo standard's checks).

```text
src/index.ts         the plugin
src/lib.ts           pure helpers, unit-tested in src/lib.test.ts
test/hello.spec.ts   e2e on the SDK's harness (Playwright WebKit)
```

## Make a plugin from it

"Use this template" on GitHub, or:

```sh
gh repo create my-plugin --template tilr-dev/plugin-template --clone
cd my-plugin
npm install
npx playwright install webkit   # once per machine, for the e2e tests
```

Then rename: in package.json `name`, `description`, `tilr.name`, `repository`, `homepage` and
`bugs`; the plugin's `name`, window type and store area in `src/index.ts`; `test/`. (A future
`npx tilr-plugin init` will do this for you.) AGENTS.md has the rules for whoever writes the code.

## Run

```sh
npm run dev:site      # a local Tilr page with this plugin, rebuilt on save
npm run verify        # format, lint, types, unit, dupes, unused, secrets, deps
npm run verify:full   # + e2e tests
npm run build         # dist/index.js
```

Install into a Tilr site folder (a test Tilr): `npm run install:site -- --site <folder>`.

## Releases

TBD: the plugin release format is not decided yet.

## License

MIT or Apache-2.0, at your option.
