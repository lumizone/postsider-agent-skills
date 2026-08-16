# OpenCode

**Install:**
1. Merge the `mcp.postsider` entry from `opencode.json` into your project's
   `opencode.json`, filling in your org API key.
2. Append the contents of `AGENTS.md` to your project's own `AGENTS.md` (or
   copy it in as-is if you don't have one).

`@postsider/mcp` is not yet published to npm, so `opencode.json`'s `command`
points at a locally built `apps/mcp/dist/index.js`. Clone `github.com/lumizone/postsider`,
run `pnpm install && pnpm --filter @postsider/mcp build`, and adjust the path to
where you cloned it. Once published, this simplifies to `npx -y @postsider/mcp`.

Auth, tool reference, and workflows: `../../core/`.
