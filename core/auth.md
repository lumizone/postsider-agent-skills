# Authentication

Connect your agent with your organization's **API key**. This page explains
how to create one and how to pass it to each provider adapter.

## The org API key

PostSider's public API and MCP server authenticate with a single
organization-level API key:

| | Org API key (`ps_...`) |
|---|---|
| Scope | Full organization access (every channel, post, and analytics the org can see) |
| Rate limits | None (subject to the platform's global throttling) |
| Human review (HITL) | Not a token feature; use drafts + `postsider_request_approval` to gate posts by a human |
| Expiry | Keys never expire; delete the key in Settings > API to revoke it |
| Best for | AI agents, automation pipelines, and your own server-side code alike |

There is currently one credential type: the org API key. There are no
scoped agent tokens (capabilities, per-connector limits, or token-level HITL
are not part of PostSider yet).

## Create a key

1. In PostSider, go to **Settings > API** (admin only).
2. Click **New key** (or the equivalent create button), give it a name, and
   copy the raw value. It starts with `ps_` and is shown **only once** at
   creation, so store it in your agent's config immediately. Never paste it
   into a prompt or commit it to a repo.
3. To revoke a leaked or unused key, delete it from the same page.

## Using the key

Send it as the raw `Authorization` header value (no `Bearer` prefix):

```
Authorization: ps_AbCdEfGhIjKlMnOpQrStUvWxYz0123456789abcdef
```

For MCP-native providers (Claude, Cursor, OpenCode, Gemini CLI), set it as
`POSTSIDER_API_KEY` in the MCP server's environment. The bundled MCP server
(`apps/mcp` in `lumizone/postsider`, intended for npm as `@postsider/mcp`)
reads that variable and sends it as the Authorization header for every call.
`@postsider/mcp` is not yet published to npm; until it is, clone
`github.com/lumizone/postsider`, run `pnpm install && pnpm --filter @postsider/mcp build`,
and point each provider config's `command`/`args` at the built
`apps/mcp/dist/index.js` instead of `npx -y @postsider/mcp` (see the
provider adapters under `providers/` for the exact config shape).

## Base URL

- PostSider Cloud: `https://api.postsider.com`
- Self-hosted: your instance's public API base, typically `https://<your-domain>/api`

Full API reference: https://docs.postsider.com
