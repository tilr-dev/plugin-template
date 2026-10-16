# Working in this Tilr plugin repo

A Tilr plugin: an ES module the Tilr page loads from `plugins/<name>/index.js`. The kit is the
dev dependency `@tilr-dev/plugin` (its README and docs/plugin-sdk.md: the API, the build, the
tests; docs/GUIDELINES.md: the rules for plugins). Plugin-specific notes go below the line.

## Before every commit

- **`npm run verify` must be green** (`tilr-plugin verify`): format, lint, types, api, unit,
  dupes, unused, secrets, deps. The pre-push hook and CI run the same; green here, green there.
  `npm run verify:full` adds the e2e tests (Playwright WebKit) and `npm pack --dry-run`.
- `npx biome format --write .` fixes formatting. Lint findings are fixed, not silenced.
- The hooks come with `npm install` (lefthook). Do not bypass them with `--no-verify`.

## Commits

- **Conventional Commits**: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `ci`, `perf`,
  optional scope, `!` / `BREAKING CHANGE:` for a break, footers `Refs: #N` / `Closes: #N`.
- **No AI attribution**: no "Generated with …" lines, no agent `Co-Authored-By`.
- One logical change per commit; short branches (`feat/12-short-name`), squash-merged into
  `master`, which stays green. Releases: not set up yet (the plugin release format is TBD).

## Code

- No `any`, no non-null `!`, no `@ts-ignore` without a reason, no floating promises, no
  `console` in `src/`. Complexity ≤ 15, depth ≤ 4, params ≤ 4.
- An `eslint-disable` needs a description: `// eslint-disable-next-line rule -- why`.
- The configs are one-liners onto the SDK (`eslint.config.js`, `biome.json`, `lefthook.yml`,
  `commitlint.config.js`, `tsconfig*.json`): change the rules in the SDK, not here.

## Secrets

- Assume the repo is public: no tokens, keys, `.env` files or personal data in code, tests,
  fixtures or commit messages. gitleaks scans staged changes and the history.

---

## This repo

The Tilr plugin template, and the `hello` example plugin: a "Hello" window with a heading, a
button and a click counter kept in the plugin's store area (`ctx.store.area('hello')`).

- `src/index.ts`: the plugin (`definePlugin`, injects `ui`, `windows`, `store`; a DOM window
  drawn with `frame()` / `element()` from `tilr/ui`).
- `src/lib.ts`: pure helpers (no DOM, no `'tilr'`), unit-tested in `src/lib.test.ts`.
- `test/hello.spec.ts`: e2e on the SDK harness (`@tilr-dev/plugin/test`).
- The name `hello` is in `src/index.ts`, `package.json` (`tilr.name`) and `test/`: a plugin made
  from this template renames all of them together, plus `name`, `description`, `repository`,
  `homepage` and `bugs` in package.json.
- `@tilr-dev/plugin` comes from npm (`^0.1.x`), never a `file:` link.
