# Security Policy

## Supported versions

package-name is a single-track project. Security fixes go into the latest release, and there
are no maintained older branches.

| Version        | Supported |
| -------------- | --------- |
| Latest release | Yes       |
| Anything older | No        |

## Reporting a vulnerability

**Please do not open a public issue for a security problem.**

Report it through GitHub's private vulnerability reporting:

<https://github.com/henzyd/package-name/security/advisories/new>

That channel is visible only to the maintainers. You will get an acknowledgement within
seven days, and an assessment with a fix or a rejection within thirty.

Useful things to include:

- What an attacker can do, and what they need to already have in order to do it
- The affected version, your runtime and version, and whether you use ESM or CommonJS
- A minimal reproduction

## What is in scope

- A flaw in the package's own code that lets untrusted input cause unintended behaviour,
  such as unbounded CPU or memory use, or writes outside an intended location.
- A dependency, or a file in the published tarball, that should not be there.

<!-- Make this list specific to what your package does. A parser should name malformed
     input; a library running regular expressions should name catastrophic backtracking. -->

## What is out of scope

- Findings that require the user to have already been persuaded to run untrusted code.
- Behaviour the documentation says the package does not provide.
- Dependency advisories in development tooling, which never reaches a user's machine.

## Disclosure

We will credit you in the release notes unless you prefer otherwise. Please give us a
chance to ship a fix before publishing details.
