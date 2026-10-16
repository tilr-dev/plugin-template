# Tilr plugin template

The starting point for a [Tilr](https://github.com/tilr-dev) plugin, and a working example:
**hello**, a window with a heading, a button and a click counter kept in the plugin's store, so
it survives a reload. Built on [`@tilr-dev/plugin`](https://www.npmjs.com/package/@tilr-dev/plugin)
(the API types, the build, the e2e harness and the repo standard's checks).

```text
src/index.ts         the plugin
src/lib.ts           pure helpers, unit-tested in src/lib.test.ts
test/plugin.spec.ts  e2e on the SDK's harness (Playwright WebKit)
```

## Make a plugin from it

"Use this template" on GitHub, or:

```sh
gh repo create my-plugin --template tilr-dev/plugin-template --clone
cd my-plugin
npm install
npx playwright install webkit   # once per machine, for the e2e tests
```

Then name it. The plugin's name lives in two places: `package.json` → `tilr.name` and `NAME` in
`src/index.ts` (the plugin, its window type, store area and CSS class); the tests read it from
package.json. `npx tilr-plugin init my-plugin` (from the next SDK release) sets both, plus
package.json's `name`, `repository`, `homepage` and `bugs` from the git remote. By hand: change
those two. AGENTS.md has the rules for whoever writes the code.

## Run

```sh
npm run dev:site      # a local Tilr page with this plugin, rebuilt on save
npm run verify        # format, lint (oxlint), types (tsc), unit, dupes, unused, secrets, deps
npm run check         # lint and types only
npm run verify:full   # + e2e tests
npm run build         # dist/index.js
```

Install into a Tilr site folder (a test Tilr): `npm run install:site -- --site <folder>`.

Remove from Tilr: `npx tilr-plugin uninstall-site [--site DIR]` (from the next SDK release). By
hand: delete `<site>/plugins/<name>/` and remove the name from `<site>/plugins.json`.

## Releases

release-please (`.github/workflows/release.yml`, run as the org GitHub App `tilr-bot`) keeps a
release PR open from the Conventional Commits on `main`: the version in package.json and a
CHANGELOG entry (while 0.x, `feat` and breaking changes bump the minor, `fix` the patch).
Merging it tags `vX.Y.Z` and creates the GitHub release. CI runs on the release PR like on any
other; merging it is the release approval.

Not yet: the built `dist/` and the plugin manifest in the release tag (the format plugin
managers install from) are pending a decision on the plugin release format. A plugin made from
this template outside the `tilr-dev` organization needs its own app or token for release-please.

## License

MIT or Apache-2.0, at your option.
