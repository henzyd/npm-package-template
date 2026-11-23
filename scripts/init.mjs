/**
 * Turn a fresh copy of this template into a real package.
 *
 *   node scripts/init.mjs --name @scope/my-package --repo owner/my-package \
 *     --description "What it does" [--author "Your Name"]
 *
 * It replaces the placeholder name, repository and description everywhere they appear,
 * swaps this README for a package README, refreshes the lockfile, and then deletes
 * itself. Run it once, review the diff, and commit.
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const PLACEHOLDER_NAME = '@henzyd/package-name';
const PLACEHOLDER_REPO = 'henzyd/package-name';
const PLACEHOLDER_BARE = 'package-name';
const PLACEHOLDER_DESCRIPTION = 'A short description of the package.';

const { values } = parseArgs({
  options: {
    name: { type: 'string' },
    repo: { type: 'string' },
    description: { type: 'string' },
    author: { type: 'string' }
  }
});

const fail = (message) => {
  console.error(`init: ${message}`);
  process.exit(1);
};

const { name, repo, description } = values;
if (!name || !repo || !description) {
  fail('--name, --repo and --description are all required.');
}
if (!/^(@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/.test(name)) {
  fail(`"${name}" is not a valid npm package name.`);
}
if (!/^[A-Za-z0-9][A-Za-z0-9-]*\/[A-Za-z0-9._-]+$/.test(repo)) {
  fail(`"${repo}" should look like owner/repository.`);
}

const owner = repo.split('/')[0];
const bare = name.includes('/') ? name.split('/')[1] : name;
const author = values.author ?? owner;

const SKIP = new Set(['node_modules', 'dist', '.git', 'package-lock.json']);

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) yield* walk(full);
    else yield full;
  }
}

const self = path.join(root, 'scripts', 'init.mjs');

for (const file of walk(root)) {
  if (file === self || file.endsWith('.tgz')) continue;

  const before = readFileSync(file, 'utf8');
  let after = before
    // Longest first, so the scoped name is not half-rewritten by the shorter ones.
    .replaceAll(PLACEHOLDER_NAME, name)
    .replaceAll(PLACEHOLDER_REPO, repo)
    .replaceAll(PLACEHOLDER_BARE, bare)
    .replaceAll(PLACEHOLDER_DESCRIPTION, description);

  const relative = path.relative(root, file);
  if (relative === 'LICENSE') {
    after = after.replace(
      /Copyright \(c\) \d{4} .*/,
      `Copyright (c) ${new Date().getFullYear()} ${author}`
    );
  }
  if (relative === path.join('.github', 'CODEOWNERS')) {
    after = after.replaceAll('@henzyd', `@${owner}`);
  }

  if (after !== before) writeFileSync(file, after);
}

// package.json: drop the guard that stops the template itself being published, and the
// init script that is about to disappear, then set the author.
const pkgPath = path.join(root, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
delete pkg.private;
delete pkg.scripts.init;
pkg.author = author;
writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

writeFileSync(
  path.join(root, 'README.md'),
  `# ${name}

${description}

## Install

\`\`\`bash
npm install ${name}
\`\`\`

\`\`\`ts
import { greet } from '${name}';

greet('world'); // 'Hello, world!'
\`\`\`

Both ESM and CommonJS are supported, with bundled type declarations.

## Documentation

See [docs/](docs/README.md).

## Requirements

Node 20.19 or newer.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Security issues follow [SECURITY.md](SECURITY.md).

## Licence

MIT
`
);

rmSync(self);
rmSync(path.join(root, 'scripts'), { recursive: true, force: true });

// The lockfile records the package name, so regenerate it without installing anything.
execFileSync(
  process.platform === 'win32' ? 'npm.cmd' : 'npm',
  ['install', '--package-lock-only', '--ignore-scripts'],
  {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  }
);

console.log(`
Initialised ${name}.

Next:
  npm install
  npm run check
  review CHANGELOG.md, SECURITY.md and docs/, then commit.
`);
