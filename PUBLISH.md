# Publishing guide (DAR-47)

**Last audited:** 2026-09-07 (CT)

## Short answer

| Item | Value |
|------|--------|
| **Production branch** | `main` |
| **Live site** | https://darrenbell.net |
| **Also served** | https://darrenbell09.github.io/DB_Blog/ (same Pages deployment) |
| **Publish mechanism** | GitHub Actions → GitHub Pages (`actions/deploy-pages`) |
| **Repo default branch** | `claude/create-professional-blog-LXkON` (unusual; **not** production) |

## Is the unusual default branch intentional?

**Almost certainly not for production.** Evidence:

1. `.github/workflows/deploy.yml` triggers only on pushes to **`main`** (plus `workflow_dispatch` and a daily cron).
2. `main` has `CNAME` → `darrenbell.net` and `_config.yml` with `url: https://darrenbell.net` / `baseurl: ""`.
3. The default branch still has the older `url: https://darrenbell09.github.io` / `baseurl: /DB_Blog` and no `CNAME`.
4. Live https://darrenbell.net matches `main` branding (e.g. “Senior IT Operations Leader”) and content cadence; newest visible post on the live site aligns with what `main` has published (future-dated posts on `main` wait for the daily cron / next deploy).
5. The default branch name is a leftover Claude Code session branch (`claude/create-professional-blog-LXkON`), not a conventional `main`/`gh-pages` production name.

**Recommendation:** Keep publishing from `main`. Optionally change the GitHub **default branch** setting to `main` for clearer clones/PRs — that is a low-risk settings change and does **not** by itself change what Pages deploys. Do **not** change the Pages production source away from the Actions workflow without a deliberate cutover plan.

Final default-branch rename is left to the repo owner (Decision label). This doc does not force-change it.

## Shortest safe publish path

1. Commit and push to **`main`** (or open a PR into `main` and merge).
2. Wait for workflow **Deploy Jekyll Blog to GitHub Pages** (`.github/workflows/deploy.yml`).
3. Confirm https://darrenbell.net after the deploy finishes.

### What the deploy does

- Checkout `main`
- `bundle exec jekyll build --baseurl ""` with `JEKYLL_ENV=production`
- Upload Pages artifact → `actions/deploy-pages`

### Scheduled posts

A daily cron (`0 13 * * *` UTC ≈ 8:00 AM CT / 7:00 AM CDT depending on DST) redeploys so future-dated posts go live without a manual push. You can also run the workflow manually via **Actions → Deploy Jekyll Blog to GitHub Pages → Run workflow**.

### Local preview (optional)

```bash
bundle install
bundle exec jekyll serve
# open http://127.0.0.1:4000/
```

## Branches (audit snapshot)

| Branch | Role |
|--------|------|
| `main` | **Production source** for Pages |
| `claude/create-professional-blog-LXkON` | Current GitHub **default** clone branch; outdated config; do not treat as prod |
| `style-original` | Historical / experiment |
| `ui-experiments` | Historical / experiment |
| `gh-pages` | **Not present** — deploy is Actions-based, not a `gh-pages` branch |

## Risks

- Pushing only to the Claude default branch **will not** publish (workflow listens to `main`).
- Changing Pages settings from “GitHub Actions” to a branch source without updating config would break `darrenbell.net` / baseurl assumptions.
- Deleting or force-pushing `main` would affect production; avoid without backup.
- Raw paths like `/about.html` may 404; pretty URLs (`/about/`) are the intended links.

## DAR-50 notes (validation)

### Automated CI (pending install)

Template: `docs/ci-workflow.yml` + `lychee.toml`.

Install (requires a token/app with GitHub **workflows** write permission — the audit agent’s Contents API returned 404 for `.github/workflows/*`):

```bash
cp docs/ci-workflow.yml .github/workflows/ci.yml
git add .github/workflows/ci.yml lychee.toml
git commit -m "ci: enable Jekyll build + lychee (DAR-50)"
git push
```

That workflow runs `bundle exec jekyll build --baseurl ""` then offline lychee on `_site`.

### Live spot-check (2026-09-07 CT)

| URL | Status |
|-----|--------|
| `/`, `/blog/`, `/about/`, `/contact/`, `/categories/`, `/tags/`, `/search/` | 200 |
| `/atom.xml`, `/assets/css/main.css` | 200 |
| Sample post permalinks + `/blog/page2/`, `/blog/page3/` | 200 |
| `/assets/images/1769196097959.jpg`, `/assets/images/og-default-v3.png` | checked in follow-up |
| `/about.html`, `/contact.html` | **404** (pretty URLs only — expected) |
| https://darrenbell09.github.io/DB_Blog/ | 200 (same deployment) |

### Deferred

- Interactive mobile layout QA (CSS has `@media` breakpoints and `.nav-toggle` / `.mobile-menu`; visual pass deferred).
- Full offline `_site` lychee until `ci.yml` is installed under `.github/workflows/`.

## Related

- Deploy workflow: `.github/workflows/deploy.yml`
- CI template: `docs/ci-workflow.yml` → copy to `.github/workflows/ci.yml`
- Lychee config: `lychee.toml`
