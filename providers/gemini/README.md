# Gemini CLI

**Install:** merge the `mcpServers.postsider` entry from `settings.json`
into `~/.gemini/settings.json` (or your project's `.gemini/settings.json`),
filling in your agent token.

`@postsider/mcp` is not yet published to npm, so `settings.json` points
`command`/`args` at a locally built `apps/mcp/dist/index.js`. Clone
`github.com/lumizone/postsider`, run `pnpm install && pnpm --filter @postsider/mcp build`,
and adjust the path to where you cloned it. Once published, this simplifies
to `npx -y @postsider/mcp`.

Gemini CLI loads MCP tool descriptions directly, so no separate instructions
file is required - but read `../../core/workflows.md` yourself first so you
can prompt it well (e.g. "use PostSider to schedule..." rather than assuming
it infers the tool from a vague request).

Auth and tool reference: `../../core/`.

If you use Gemini through a surface without MCP support (the Gemini app, the
API without a tool-use harness), use the `providers/openai/` adapter's
OpenAPI file instead - it works with any REST-capable tool-calling setup,
Gemini function calling included, since the request/response shapes are not
provider-specific.
