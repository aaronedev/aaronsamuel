# aaron.yml

A personal developer portfolio that reads like a YAML document: syntax-colored keys and values, indentation guides, foldable sections, real project links, and a cursor-reactive YAML anchor.

## Open or run

Open `dist/index.html` in a modern browser. The complete interface, styles, scripts, icons, and initial public-data snapshot are included in that one file. No assets need downloading for the initial page.

For a local HTTP preview, from the extracted parent directory:

```bash
(cd aaron-yaml-site && npm run dev)
```

Open `http://127.0.0.1:4173`. Requires Node.js 22 or newer. There is **no npm install step** and no external runtime/build dependency. The preview command rebuilds `dist/` and starts a server bound to loopback only. Stop it with Ctrl+C. For a different port, use `npm run dev -- 4174`.

```bash
(cd aaron-yaml-site && npm test && npm run build)
```

`npm test` is read-only. The build writes `dist/index.html` and `dist/aaron.yml`. The `dist/` directory is the static-hosting output; this delivery does not publish it or modify any repository or deployment.

## What works

- Cursor gravity: the ampersand is a real point field, not an image or CSS parallax. Particles move toward and around the pointer and spring back afterward. On first view they swirl in from a loose ring; a mouse or pen click near the glyph bursts it. A faint dust field covers the whole page behind the content: densest and brightest around the ampersand, thinning to a faint floor further away. Cursor gravity works across the page and any mouse or pen click sends a shockwave through the dust, both weaker the further they are from the ampersand. Points glow through pre-rendered sprites with additive blending, twinkle gently, and heat toward a white-pink spark when moving fast. Every frame is cleared, so no muddy trails accumulate.
- Motion follows the operating-system reduced-motion preference. The footer toggle can disable motion; it cannot override an OS request for reduced motion. Animation pauses when the canvas leaves the viewport or the tab is hidden. Work is bounded to 2,100 desktop or 750 coarse-pointer particles, at a maximum device-pixel ratio of 1.5.
- Projects filter by category, expand details, and link to actual public repositories. Sections fold and reopen when navigated to.
- Public GitHub counters attempt a refresh at first load and on demand. The last verified snapshot remains visible when a request fails.
- View raw opens a real YAML export. Copy and `.yml` download use the displayed data. Clipboard access depends on the browser context; download remains available when clipboard permission is denied.
- Contact links point to the public GitHub and Matrix identities. No invented email, availability statement, or form backend.
- Native links, headings, buttons, a skip link, focus styles, a dialog, responsive layouts, and static content that remains readable without JavaScript.

## Edit

| File | Purpose |
| --- | --- |
| `src/content.mjs` | Curated projects, public source identities, dated data snapshot, YAML export |
| `src/layout.html` | Page structure, hero/contact copy, metadata, initial static counter labels |
| `src/styles.css` | Theme tokens (top `:root` blocks), type scale, layout, responsive and print rules |
| `src/particles.mjs` | Glyph sampling, cursor influence, spring dynamics, animation lifecycle |
| `src/github.mjs` | Public-source validation, refresh, optional cache, WakaTime aggregate parsing |
| `src/render.mjs` | Escaped project and language markup |
| `src/app.mjs` | Filtering, folding, source dialog, stat rendering, motion preference |
| `scripts/build.mjs` | Dependency-free assembly of the self-contained HTML |
| `scripts/serve.mjs` | Local preview server |
| `tests/site.test.mjs` | Node unit tests |

The visual page is YAML-inspired HTML, not a YAML editor or a YAML-driven CMS. Project content and exported YAML are generated from `content.mjs`; hero/contact markup and initial non-JavaScript counters also live in `layout.html`. Update both where appropriate. `npm run dev` rebuilds on save; reload the page to see changes.

### Tweak colors

All colors live in the first `:root` block of `src/styles.css`:

- **Palette**: the only raw hex values (`--bg`, `--fg`, `--violet`, `--cyan`, ...).
- **Semantic roles**: what each color is used for (`--accent`, `--key`, `--string`,
  `--link`, `--comment`, ...). Repoint these to restyle one role without touching others.
- **Derived**: borders, tints, and surfaces mixed from the palette with `color-mix()`, so
  changing `--violet` also updates buttons, outlines, and highlights.

The second `:root` block holds the type scale (`--fs-*`) and gutter geometry. Breakpoints
mostly reassign those tokens.

For quick iteration, run `npm run dev`. It rebuilds on every change under `src/`; reload the
page to see it. You can also edit the variables live in DevTools on the `<html>` element and
copy the values back. The particle field, `<meta name="theme-color">`, and the favicon follow
`--bg`/`--violet` (and `--orchid` for particles) automatically.

The palette uses the public Violet Void background and violet/pink accents with softened cyan/green for the web surface. Typography uses installed system fonts; no font files are included or downloaded.

## Data provenance and meaning

Read-only observations were collected on **6 September 2026** from the public profile and profile README:

- https://github.com/aaronedev
- https://github.com/aaronedev/aaronedev/blob/main/README.md
- https://raw.githubusercontent.com/aaronedev/aaronedev/main/README.md

The initial profile snapshot contains **94 public repositories** on the personal account and **140 followers**. It does not include organization totals or private-repository counts. GitHub's profile navigation “Stars” number means repositories the account has starred, so it is deliberately not presented as stars received.

Per-project star snapshots are tied to these exact public repositories: `aaronedev/violet-void-theme` (11), `aaronedev/nerdfont-icon-rofi-picker` (3), `aaronedev/violet-void-theme_archwiki` (3), and `aaronedev/aaronedev` (28).

The initial **77h 15m** coding-time figure and language percentages are the **latest published week in the profile README**, observed on that date. They are not claimed to describe the current calendar week. Language percentages measure coding time, not lines of code, expertise, or repository composition. “Remaining” combines all categories not individually shown; it is computed as 100 minus the displayed categories. Rounding visible labels to one decimal can produce a 0.1-point visual rounding difference.

The public README is the source for the week, not a private WakaTime API. No API key is required. If it no longer contains parseable aggregates, the old dated observation is preserved. If a parsed report has no trustworthy published total, coding time becomes “Not published” instead of being fabricated.

## Network and privacy

Runtime requests go only to:

1. `https://api.github.com/users/aaronedev`
2. The GitHub REST endpoints for the four exact curated public repositories
3. The public profile README on `raw.githubusercontent.com`

Requests omit credentials and use a seven-second timeout. Profile responses contribute only validated public counts. Repository responses must match both the exact curated allowlist and public visibility. HTML text is escaped before interpolation. A private/unavailable repository is never treated as a successful current public response. A dated, previously public project description can remain visible as an explicitly labeled snapshot after an HTTP 404; remove the project from `content.mjs` to remove that historical description entirely.

A short, optional 15-minute localStorage cache stores public profile/repository observations. Motion preference is also stored locally. No analytics, tracking pixels, credentials, private project data, or third-party font requests are included. Blocked storage does not prevent using the site. API rate limits, browser/network policy, CORS, and source outages can prevent a refresh; the site identifies snapshot, cached, partial, and live states instead of inventing success.

## Verification

See `VERIFICATION.md` for the actual test results, visual review, and environment limitations. Live external network requests could not be exercised end-to-end in the build environment; public source content was fetched separately, and network success/failure handling was verified with deterministic fixtures.

### Optional browser regression suite

`tests/browser-checks.py` reproduces the 47 checks using Python, Playwright, PyYAML, and a Chromium installation. These are optional QA tools, not website dependencies. With those tools already available, run `python tests/browser-checks.py` from the project directory. It writes `test-results/`; set `PORTFOLIO_QA_OUTPUT` to change that directory and `CHROMIUM_PATH` to select a browser executable. The suite renders the built HTML in a local page and intentionally stubs network requests.
