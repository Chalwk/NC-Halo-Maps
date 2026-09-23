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

**Optional, but helpful**: dropping a screenshot into the release notes (drag-and-drop an image into the
GitHub release description) will automatically be used as the map's thumbnail. You can also
attach an image file directly to the release for the same effect.

For the best results, thumbnails should be a **16:9 image**. The card thumbnails on the
Maps page and in the "Latest Releases" section on the home page are both rendered in a 16:9
box with `object-fit: cover`, so a 16:9 image fits perfectly with nothing cropped.

**Recommended size: 1280 x 720 pixels.** Up to 1920 x 1080 is fine for extra resolution,
but there is no visible benefit going any larger, since the site displays them small.

If the image is square or 4:3 it will be cropped to fill the box, so keep the important
part of the screenshot (the map itself, the action) in the centre of the frame.

Keep the file size under a few hundred KB where possible, so the pages stay fast. Accepted
formats are PNG, JPG, JPEG, GIF, and WEBP.

---

## License

© 2026 NakedChick. All rights reserved.

All content in this repository, including source code, images, and documentation, is proprietary. You may not copy,
redistribute, or use any assets without explicit prior written permission. This does not apply to the map files
themselves, which are distributed via GitHub Releases for download and use with Halo: Custom Edition, and Halo: Combat Evolved.

For the full legal terms, please read the [LICENSE](LICENSE) file.

Website developed by [Chalwk](https://github.com/Chalwk) for NakedChick.

---