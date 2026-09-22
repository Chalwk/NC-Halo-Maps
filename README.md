# NC Halo Maps

This repository contains the source code for the NC Halo Maps website - a static site built
for NakedChick's custom Halo: PC/CE maps, hosted on GitHub Pages.

Browse, preview, and download map releases on this auto-updating static site.

<div align="center">
  <a href="https://nakedchick-code.github.io/NC-Halo-Maps/">
    <img src="https://img.shields.io/badge/VISIT_WEBSITE-c9a15a?style=for-the-badge&logo=github"
         alt="Visit Website"
         style="height: 60px;">
  </a>
</div>

---

## How map data works (no API rate-limit issues)

The Maps page does **not** call the GitHub API from the browser. Instead:

1. `.github/workflows/fetch-releases.yml` runs on a schedule (every 6 hours), whenever a
   release is published/edited, or manually via the Actions tab. It uses the built-in
   `GITHUB_TOKEN` (1,000 requests/hour - far more than needed) to fetch every release and
   its attached files, then writes the result to `_data/releases.json` and commits it.
2. `.github/workflows/jekyll.yml` builds and deploys the site with Jekyll, reading
   `_data/releases.json` at build time. It also runs automatically right after the data
   workflow finishes.
3. Visitors' browsers only ever load a static, pre-built page - zero runtime API calls,
   so there's no rate-limit risk no matter how much traffic the site gets.

**To publish a new map:** just create a new [GitHub Release](../../releases/new) with the
map's `.zip` (or other files) attached. Give it a title that starts with `[PC]` or `[CE]`,
for example `[CE] Liberty Hangar`, so the site knows which game the map is for. Within a
few hours (or immediately if you run the "Fetch Releases Data" workflow manually from the
Actions tab) it'll appear on the Maps page.

### Tagging releases by game

The Maps page has an "All / Combat Evolved / Custom Edition" filter, and each map card
shows a `PC` or `CE` badge. Which one it gets is decided by `detectGames()` in the fetch
workflow, which checks, in order:

| Priority | Source                                                                            | Example                                    |
| -------- | --------------------------------------------------------------------------------- | ------------------------------------------ |
| 1        | Exact tag match                                                                   | `PC`, `CE`, `PC+CE`, `CE+PC`               |
| 2        | Bracket in the release title                                                      | `[CE] Liberty Hangar`, `[PC+CE] Crossover` |
| 3        | "Custom Edition" / "Combat Evolved" / `CE` / `PC` anywhere in title, tag, or body | `Halo CE remake of...`                     |
| 4        | Fallback                                                                          | Defaults to `CE`                           |

The recommended convention is priority 2: **always start the release title with `[PC]` or
`[CE]`.** GitHub requires every release tag to be unique, so you cannot tag multiple
releases `CE` - but the `[CE]` / `[PC]` marker in the title works every time, and the
release's tag itself can be anything (a map name, a version number, and so on).

**Note:** if the marker is missing from the title and nothing else in the release mentions
the game, the release will silently be classified as Custom Edition. If that happens, edit
the release and add `[PC]` or `[CE]` to the title, then run the "Fetch Releases Data"
workflow again.

**Optional, but helpful**: dropping a screenshot into the release notes (drag-and-drop an image into the
GitHub release description) will automatically be used as the map's thumbnail. You can also
attach an image file directly to the release for the same effect.

---

## License

© 2026 NakedChick. All rights reserved.

All content in this repository, including source code, images, and documentation, is proprietary. You may not copy,
redistribute, or use any assets without explicit prior written permission. This does not apply to the map files
themselves, which are distributed via GitHub Releases for download and use with Halo: Custom Edition, and Halo: Combat Evolved.

For the full legal terms, please read the [LICENSE](LICENSE) file.

Website developed by [Chalwk](https://github.com/Chalwk) for NakedChick.

---