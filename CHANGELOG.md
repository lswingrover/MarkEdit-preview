# Changelog

## [1.10.2] — 2026-09-03

- chore(deps): clear all open Dependabot advisories — mermaid 11.17.2, js-yaml 4.3.2, dompurify 3.4.14, linkify-it 5.0.2, postcss 8.5.28, brace-expansion 1.1.18/5.0.9, esbuild 0.28.2
- build: adopt Yarn 4.18.0 (Berry) as the pinned project package manager (`packageManager` field). Classic yarn 1.x cannot install this dep set (vitest4/vite7 hoist bug); Berry with the node-modules linker installs cleanly and fixes CI too
- fix: declare the `patch-package` devDep that `postinstall` requires (was referenced but undeclared, so installs half-failed)
- verified: lint clean, 179 tests pass, bundle rebuilt with KaTeX + Mermaid intact

Files changed in this ship:
- M package.json
- M yarn.lock
- M dist/markedit-preview.js
- M .gitignore

## [1.10.1] — 2026-08-03

- docs: document math (KaTeX) and mermaid toolbar menus

Files changed in this ship:
- M dist/markedit-preview.js
- M package.json

## [1.10.0] — 2026-08-03

- feat(toolbar): math (KaTeX) and mermaid insertion menus
- githooks: re-vendor canonical @ b15fcc44690b
- githooks: re-vendor canonical @ ce8866e3c27c — --sweep now names its basis per repo
- githooks+helpers: re-vendor from merged canonical @ b6cd55b35dd9
- githooks: re-vendor from MERGED canonical @ 26a361a5faf6
- githooks: re-vendor canonical @ 4d86568b4cc9 onto main
- fix: resolve build-variant drift; pin happy-dom; refresh vendored worktree script (#10)
- docs: document Quick Look behavior and the shim invariant (#9)
- fix(quicklook): restore markdown rendering — complete the require shim (#8)
- chore(githooks): vendor the discreet-denylist hook (#7)
- chore(githooks): take the trunk-commit backup; drop a local-only file I shipped by mistake (#6)
- chore(githooks): re-vendor — self-exclusion no longer names the env var (#5)
- feat: unified toolbar + source-mode formatting picker; ship.sh changelog automation
- chore(githooks): re-vendor from canonical — the self-exclusion was dead here (#4)
- docs: note the abandoned markedit-wysiwyg standalone experiment

Files changed in this ship:
- M dist/markedit-preview.js
- M package.json
