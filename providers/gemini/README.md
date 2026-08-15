# Gemini CLI

**Install:** merge the `mcpServers.postsider` entry from `settings.json`
into `~/.gemini/settings.json` (or your project's `.gemini/settings.json`),
filling in your agent token.

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
