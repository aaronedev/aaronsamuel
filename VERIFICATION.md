# Verification — 6 September 2026

## Result

- Dependency-free build: passed.
- Node unit tests: **19 passed, 0 failed**.
- Playwright Chromium browser assertions: **47 passed, 0 failed**.
- Tested viewport widths: **320, 360, 390, 768, 1024, 1440, 1920 CSS pixels**. No horizontal overflow or JavaScript runtime errors in those checks.
- Mobile touch context: **390 × 844**, bounded particle count, functional filtering, source dialog within the viewport.
- Desktop visual review: **1440 × 1000**, plus full-page and activity-section captures.

## Functional paths checked

All/themed/tool project filtering, filter announcements, project expansion/collapse, palette details, section folding, navigation reopening a folded section, raw-source dialog, actual YAML parsing with PyYAML, copy handler, Blob-based YAML download, Escape dismissal and focus restoration, motion toggle, offscreen animation pause, OS reduced-motion behavior, safe external-link attributes, offline snapshots, successful validated counter refresh, missing-report dates, and content with JavaScript disabled.

Clipboard verification used an explicit clipboard API stub to confirm the exact payload. The YAML download used the browser download event and its actual filename. API success and failure used controlled fixtures; fixture numbers are not shipped in the website.

Node tests cover independent snapshots, quoting/escaping, owner and exact-repository allowlists, rejection of private/wrong-owner/invalid responses, published language/time parsing, honest language totals, denied/invalid/expired caches, measurable pointer-force displacement, stable spring settling, and refresh success/failure.

## Visual review

Inspected the rendered images directly, including full desktop and phone pages. Reviewed these concrete design points:

1. The hierarchy reads as an indented document, without terminal windows, dashboard cards, fake console output, or page-filling particles.
2. The dark background, violet keys, softened cyan values, quiet metadata, and restrained separators remain consistent across sections.
3. The hero name, scalar-style introduction, indentation rail, and native controls retain their hierarchy at desktop and phone sizes.
4. The point-built ampersand stays secondary to the readable content. Pointer-on and pointer-off captures show an actual change in its shape.
5. Project rows remain open, readable lists; descriptions, tags, stars, filters, links, and details fit the mobile layout.
6. Statistics distinguish public-account counts and the latest published coding week, with visible provenance/fallback labels.
7. Contact links, footer, dialog, mobile wrapping, and page boundaries were checked for clipping and overflow.

No image-generated or user-approved visual mockup was used, so no pixel-fidelity claim against such a mockup is made. The direct rendered-page review was against the requested YAML-document direction. Decorative line markers are visual structure, not literal byte-for-byte line numbers from the exported YAML.

## Defects fixed during verification

- A WakaTime operating-system aggregate regex could match across line boundaries; it was narrowed to horizontal whitespace.
- Decorative art exceeded the mobile/tablet viewport; the art/glow bounds were corrected without hiding overflow on the page.
- Fractional particle-sampling increments could exceed the touch cap by one; sampling now uses an integer-bounded iteration count.
- Mobile project description sizing and statistics-note placement were corrected.

## Environment limits

The Sites creation tool was not exposed in this conversation. This delivery is a complete runnable static site and source project, **not a published Sites URL**.

An interactive browser app tool was unavailable, so testing used installed Playwright and Chromium. Browser navigation to the local HTTP server was blocked by the execution environment's administrator policy. The exact built HTML was therefore rendered with Playwright `set_content`, without changing or bypassing that policy. The Node preview server separately returned HTTP 200 to an ordinary local HTTP client.

External live API traffic was unavailable in the runtime. Read-only public GitHub sources were fetched through the available connector/web tools for the initial snapshot; the shipped browser refresh code was tested with success/failure fixtures, not an end-to-end live request. No claim is made that third-party API availability, quotas, or future README formatting were validated.

No GitHub repository, branch, deployment, domain, or live system was changed. Only the generated project and local test artifacts were written.
