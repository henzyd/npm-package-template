# npm-package-template

A starting point for a small, dependency-free TypeScript library published to npm.

It ships ESM and CommonJS with bundled types, and comes with the checks, CI, and release
workflow already wired up.

## What you get

- **Build:** [tsdown](https://tsdown.dev) producing ESM and CJS plus declarations.
- **Quality:** TypeScript (strict), ESLint with `typescript-eslint`, Prettier, Vitest.
- **Package checks:** `publint` and Are the Types Wrong, plus an install smoke test that
  packs the tarball, installs it into a throwaway project, and loads it from both `import`
  and `require`.
- **CI:** quality, tests across Node versions and operating systems, a build job, and the
  install smoke test on every supported Node version.
- **Security:** CodeQL, dependency review, a weekly `npm audit`, and Dependabot.
- **Release:** a manual workflow that verifies, publishes to npm with provenance, tags, and
  creates the GitHub release. It refuses to run off `main` or to reuse a version.
- **Repository furniture:** issue and PR templates, `CONTRIBUTING`, `SECURITY`,
  `CODE_OF_CONDUCT`, `CHANGELOG`, `CODEOWNERS`.

## Using it

1. Click **Use this template** on GitHub (enable _Template repository_ in the repo
   settings first), or clone and remove `.git`.
2. Run the init script. It replaces the placeholder name, repository, description and
   author everywhere, writes a package README, regenerates the lockfile, and deletes
   itself:

   ```bash
   npm run init -- \
     --name @scope/my-package \
     --repo owner/my-package \
     --description "What it does"
   ```

3. Install and run the full gate:

   ```bash
   npm install
   npm run check
   ```

4. Replace `src/index.ts` and `test/index.test.ts`, then edit `SECURITY.md` so its scope
   describes what your package actually does.

## Before the first release

- Create a `release` environment on GitHub with an `NPM_TOKEN` secret.
- Enable private vulnerability reporting, and require pull requests on `main`.
- Add a `## [x.y.z]` section to `CHANGELOG.md` for the version in `package.json`.
- Run the **Release** workflow once with the dry-run option.

## Requirements

Working on the package needs Node 22.18 or newer, because the build tooling requires it.
The published package supports Node 20.19 and newer, and CI checks that on the packed
tarball.

## Licence

MIT
