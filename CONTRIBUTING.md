# Contributing

Thanks for taking an interest. This is a small package with a deliberately small surface,
so the bar for a change is that it earns its place.

By taking part you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).

## Setup

You need Node 22.18 or newer to work on the package, because the build tooling requires
it. The published package itself supports Node 20.19 and newer, and CI checks that. The
package is ESM and CommonJS and has no runtime dependencies; keep it that way.

```bash
git clone git@github.com:henzyd/package-name.git
cd package-name
npm install
npm run check
```

`npm run check` is the whole gate: formatting, lint, typecheck, tests, a build, package
metadata checks (`publint` and `are-the-types-wrong`), and an install smoke test against
the packed tarball. Run it before you open a pull request. CI runs the same checks, so a
green local run is a green build.

## Layout

| Path                        | What lives there                                          |
| --------------------------- | --------------------------------------------------------- |
| `src/`                      | The library. `src/index.ts` is the public entry point     |
| `test/`                     | Vitest, one file per area, importing from `src/`          |
| `docs/`                     | The guides, which are part of the product                 |
| `.github/scripts/smoke.mjs` | Installs the packed tarball and loads it from ESM and CJS |

Anything exported from `src/index.ts` is public API and follows semver. Everything else is
internal.

## Changes that need a discussion first

Open an issue before writing code if the change would:

- add a runtime dependency;
- add, rename or remove a public export;
- change the behaviour of an existing export in a way callers could notice.

Everything else, including bug fixes, documentation and tests, is welcome as a pull
request directly.

## Tests

Tests run under Vitest and import from `src/`. Assert the behaviour, not the
implementation: a test that feeds in input and checks the result is worth more than one
that checks which function was called. Every bug found in the wild becomes a test case.

## Pull requests

1. Branch off `main`. Direct pushes to `main` are not accepted.
2. Keep one concern per pull request.
3. Add or update tests. A behaviour change with no test change will be questioned.
4. Update `CHANGELOG.md` under `## [Unreleased]` if the change is user-visible.
5. Update the guide in `docs/` that your change makes wrong. Documentation drift is
   treated as a defect.
6. Fill in the pull request template.

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/):
`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`, `perf:`, `build:`, `ci:`.

## Releases

Maintainers only. Bump the version in `package.json`, add its `## [x.y.z]` section to
`CHANGELOG.md`, and merge that through a pull request. Then run the **Release** workflow
from `main`, using the dry-run option first. The workflow verifies, publishes to npm with
provenance, tags, and creates the GitHub release. It needs an `NPM_TOKEN` secret in the
`release` environment.

## Licence

Contributions are accepted under the [MIT licence](LICENSE).
