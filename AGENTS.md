# Repository Guidelines

## Structure

Public marketing site for the SwipeTrack game, served at `https://swipetrack.run` (see `CNAME`,
hosted as a static site from `main`). Plain HTML, CSS, and vanilla JS: no build step, no framework,
no package manager.

- `index.html`: landing page (hero video, how it plays, distances and stadiums, rankings, streak, FAQ, App Store link).
- `android.html`: Android early-access landing page (Google Play).
- `blog.html`: release notes index, newest first. Each entry is a short `<article class="blog-post blog-item">`
  (version badge, date, linked title, intro paragraph) linking to the post's own page. A small script
  redirects old `blog.html#v2-3-0` style anchors to the post page.
- `blog/vX-Y-Z/index.html`: one page per release (version dots become dashes). Each has its own
  `<title>`, meta description, canonical, Open Graph/Twitter tags, `BlogPosting` JSON-LD, and links to
  the newer and older posts. Pages in subfolders use root-absolute paths (`/css/styles.css`).
- `img/og/vX-Y-Z.jpg`: 1200x630 share image per post (logo, version and title on the left, the
  post's stadium on the right).
- `sitemap.xml`, `robots.txt`: list every page, including each blog post.
- `privacy.html`, `terms.html`, `support.html`: legal and support pages.
- `game/index.html`: a `/game` short link that redirects to the App Store or Play Store by user agent.
- `css/styles.css`: the only stylesheet; its tokens match the game's theme (runner repo `marketing/brand/`).
  `js/main.js`: nav, mobile menu, scroll reveal, FAQ.

## SwipeTrack Workspace

| Repo | Path | Relationship |
|------|------|--------------|
| runner | `~/Documents/dev/unity/runner` | Unity game this site promotes. Version is `bundleVersion` in `runi/ProjectSettings/ProjectSettings.asset`. |
| swipetrack-api | `~/Documents/dev/swipetrack-api` | Game backend. The site does not call it. |
| swipetrack-dashboard | `~/Documents/dev/swipetrack-dashboard` | Private stats dashboard. Unrelated to this site. |

## Content Rules

- Add a blog post for every game release, written for players, and match the version number to the
  game's `bundleVersion`. A new post means: copy the latest `blog/vX-Y-Z/` page and its share image,
  add an entry at the top of `blog.html`, point the previous post's "Newer" card at it, add it to
  `sitemap.xml`, and update the landing page's "New in" link.
- The App Store listing links to the legal and support pages, so keep their URLs stable. The privacy
  policy must match what the game and API actually collect (Supabase auth, Apple/Google sign-in,
  APNs tokens, race data).

## Conventions

- Every page repeats the same `<header class="nav">` and footer. When you change navigation, update
  all pages.
- Keep Open Graph and Twitter meta tags, and the canonical URL, on new pages.
- Page images are compressed WebP in `img/` (`img/shots` for screenshots, `img/stadiums`, `img/icons`,
  `img/logo.svg`); compress new ones the same way. The hero video is `video/swipetrack-2.0.mov`
  (480x1040 H.264, no audio, about 3.6 MB). Replace it rather than adding more videos, and keep it small.
- To check changes, open the HTML file in a browser or run `python3 -m http.server` and view it at
  phone width.

## Commits

Use concise imperative subjects; reserve version subjects such as `v1.3.1` for release-notes posts.
Ask before destructive or materially broader changes.
