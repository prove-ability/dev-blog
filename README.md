# 개발의 기록

Personal Astro blog. Start with `pnpm install`, `pnpm dev`; validate with `pnpm verify`.

## Review process

1. A development chat produces evidence-based Markdown plus local images.
2. Create an article branch and PR, keeping status: draft while editing. The PR is the review inbox.
3. Read the Markdown in GitHub's rendered view, or run `pnpm dev` after temporarily switching a local copy to published for visual review. Never commit that switch before approval. Public preview deployments are not configured.
4. Leave review comments or request revisions in the PR. Incorporate comments; rerun checks.
5. After explicit user approval, change status to published and verify again. The user merges the PR, or explicitly asks the agent to merge.
6. Merge to main triggers the deploy workflow. GitHub Pages must be enabled with Actions as its source before the first deployment. Domain: blog.ccoshong.top. The existing root domain service is preserved.

IMPORTANT: This is a PUBLIC repository. Draft Markdown and PRs are publicly readable even though draft routes never appear on the blog. Do not put confidential drafts here. A confidential review process requires separate private storage.

GitHub PR checks provide validation, not an enforced approval boundary. Required checks, restricted main-branch writes and available branch-protection features must be configured and verified on the actual repository. A single-owner repository can require a manual merge because owners cannot approve their own PRs. Content cache is cleared before release builds so deleted posts cannot survive through stale collection data.

## Comments

Giscus is installed for prove-ability/dev-blog only. Discussions is enabled; the Announcements category is configured using public IDs in src/config.ts. Environment variables can override them when migrating. Visitors sign in with GitHub to comment; discussions are public. API tokens are not needed in client code.

`postId` is permanent and used for specific-term mapping with strict matching. A title/URL change must retain it. Do not load comments on private drafts. No end-to-end comment verification has occurred yet.

## Portability

Keep Markdown, original images, stable postIds and custom-domain paths. Prefer standard Markdown over framework-specific MDX. Image files and comments need their own migration plan. Custom domain and hosting have not been configured.

## Decisions

Astro static output, Korean personal engineering journal, native Markdown, PR review, Giscus with stable IDs. Blog title is provisional. No sample article is published. On Windows, Astro 6 is pinned for compatibility with the managed development environment.
