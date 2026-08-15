# Cursor

**Install:**
1. Copy `mcp.json`'s `postsider` entry into your `.cursor/mcp.json` (project)
   or global MCP settings, filling in your agent token.
2. Copy `postsider.mdc` into `.cursor/rules/postsider.mdc` in your project.

`@postsider/mcp` is not yet published to npm, so `mcp.json` points `command`/`args`
at a locally built `apps/mcp/dist/index.js`. Clone `github.com/lumizone/postsider`,
run `pnpm install && pnpm --filter @postsider/mcp build`, and adjust the path to
where you cloned it. Once published, this simplifies to `npx -y @postsider/mcp`.

Auth, tool reference, and workflows: `../../core/`.
