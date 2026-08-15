# Authentication

Use an **agent token**, not your organization's API key, when connecting an
AI agent to PostSider. This page explains why and how.

## Agent tokens vs. the org API key

| | Agent token (`agt_...`) | Org API key |
|---|---|---|
| Scope | Configurable subset of channels + capabilities | Full organization access |
| Rate limits | Per-token, per-minute and per-day | None |
| Human review (HITL) | Optional, can force every post to draft | Not available |
| Expiry | Optional | Never |
| Best for | AI agents, automation pipelines | Your own server-side code |

Create one in PostSider under **Settings > Developers > Agent Tokens > New
Token**. The token value is shown once; store it in your agent's config
(never paste it into a prompt or commit it to a repo).

## Capabilities

Grant only what the agent needs:

- `PUBLISH`, create and schedule posts (implies `SCHEDULE`).
- `ANALYTICS`, read engagement/performance metrics.
- `SOURCE`, pull inbound content from source-capable connectors (Reddit,
  Discord, Gmail, and others).

A request outside the token's granted capabilities or connector scope
returns HTTP 200 with an `error.code` body (`capability_not_allowed`,
`connector_not_authorized`) rather than a 4xx. Check the response body, not
just the status code, when calling the REST API directly.

## Human-in-the-loop (HITL) mode

Turn on **Require human approval** on the token (or organization-wide) to
force every post the agent creates into `draft` status regardless of what it
requested. A person reviews and publishes from the dashboard. This is the
recommended setting the first time you connect a new agent, or for any agent
that is not fully trusted yet. Combine it with `postsider_request_approval`
so the agent explicitly signals "ready for review."

## Using the token

Send it as the raw `Authorization` header value (no `Bearer` prefix), the
same as an API key:

```
Authorization: agt_A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0
```

For MCP-native providers (Claude, Cursor, OpenCode, Gemini CLI), set this as
`POSTSIDER_API_KEY` in the MCP server's environment. The bundled MCP server
(`apps/mcp` in `lumizone/postsider`, intended for npm as `@postsider/mcp`)
accepts any valid credential in that variable, agent token or org API key
alike. `@postsider/mcp` is not yet published to npm; until it is, clone
`github.com/lumizone/postsider`, run `pnpm install && pnpm --filter @postsider/mcp build`,
and point each provider config's `command`/`args` at the built
`apps/mcp/dist/index.js` instead of `npx -y @postsider/mcp` (see the
provider adapters under `providers/` for the exact config shape).

## Base URL

- PostSider Cloud: `https://api.postsider.com`
- Self-hosted: your instance's public API base, typically `https://<your-domain>/api`

Full reference: [Agent Bridge docs](https://docs.postsider.com/self-hosted/public-api/agent-bridge).
