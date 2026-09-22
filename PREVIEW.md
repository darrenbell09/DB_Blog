# Gatorworks-style rebuild — review only

**Live site is not changed.** `darrenbell.net` still deploys from `main`.

This branch exists so the rebuild can be reviewed without touching production.

## Fallback (current live)

| Item | Value |
|------|--------|
| Production branch | `main` |
| Frozen copy of current live | `fallback/live-2026-09-22` (same SHA as `main` at freeze) |
| Deploy | GitHub Actions on **`main` only** |

To restore the current site after a future merge:

```bash
git checkout main
git reset --hard fallback/live-2026-09-22
git push --force-with-lease origin main
```

That is the clean rollback. Do not force-push `main` unless you are intentionally rolling back.

## Review

The restyle is being reviewed in the Grok preview first. Nothing merges to `main` until you say so.
