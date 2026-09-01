# Digi SecureSend — a rebranded SkySend fork

This is Digi International's fork of **[SkySend](https://github.com/Skyfay/SkySend)**, an
end-to-end encrypted file and note sharing service, published to satisfy the
**AGPLv3 §13** obligation to offer the Corresponding Source to everyone who
interacts with a modified version over a network.

Forked from upstream **[v2.12.0](https://github.com/Skyfay/SkySend/releases/tag/v2.12.0)**
and **modified by Digi International on 2026-09-01**. Every commit before the
single Digi commit on top is upstream's, unmodified, so `git diff v2.12.0..HEAD`
shows the complete set of Digi changes.

## What we changed

The fork is cosmetic. **No change is made to the cryptography, the
zero-knowledge boundary, the server, the storage layer, or the CLIs** — those
are upstream's, byte for byte.

| File | Change |
| :--- | :--- |
| `apps/web/src/index.css` | Digi colour palette for both themes, Source Sans 3 `@font-face` |
| `apps/web/src/components/Layout.tsx` | Digi wordmark in the header instead of a square icon |
| `apps/web/index.html` | Pre-paint theme script, font preloads, Digi metadata |
| `apps/web/public/*` | Brand assets, `theme-init.js`, web manifest |
| `eslint.config.js` | Browser globals for `theme-init.js` |

### Why the theme is compiled in rather than configured

SkySend can be rebranded at runtime with `CUSTOM_COLOR`, and we deliberately do
not use it. Setting it makes the frontend inject:

```css
--color-primary-foreground: #ffffff !important;
```

White on Digi Green `#84C361` is **2.11:1**, which fails WCAG AA and contradicts
Digi's brand palette, which specifies Very Dark Blue `#1B4965` on Digi Green
(**4.55:1**). Compiling the tokens is the only way to get an accessible primary
button. Every contrast pair in `index.css` is measured and noted in the comments.

## Building

Standard upstream instructions apply — this fork adds no build steps:

```sh
pnpm install
pnpm validate      # lint, typecheck, 599 tests
pnpm dev

docker build -t digi-skysend .
```

Runtime configuration is upstream's; see `.env.example` and
[docs.skysend.app](https://docs.skysend.app). Digi's own deployment manifests,
environment templates, and infrastructure automation are **not** part of the
Corresponding Source and are not published here.

## Licence

**GNU Affero General Public License v3.0** — inherited from upstream. See
[LICENSE](LICENSE).

**Source Sans 3** (`apps/web/public/fonts/`) is licensed separately under the
**SIL Open Font License 1.1**, © 2010-2024 Adobe, with Reserved Font Name
'Source'. See [apps/web/public/fonts/LICENSE.md](apps/web/public/fonts/LICENSE.md).

### Trademarks

"Digi", "Digi International", the Digi logo, and the Digi brand marks in
`apps/web/public/` are trademarks of Digi International Inc. They are included
only because they are required to build this work as deployed.

**The AGPL covers the code, not the marks.** Nothing in this licence grants
permission to use Digi's name or logos. If you fork this, replace the brand
assets and the `CUSTOM_TITLE` with your own.

This repository is a source-availability publication, not a supported product.
Digi does not provide support for it. Please direct upstream bugs and features
to [Skyfay/SkySend](https://github.com/Skyfay/SkySend), and report security
issues in upstream SkySend to its maintainers at `security@skysend.app`.
