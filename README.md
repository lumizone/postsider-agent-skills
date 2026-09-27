<p align="center">
  <img src="assets/postsider-logo.png" alt="PostSider" width="80" height="80" />
</p>

<h1 align="center">PostSider Agent Skills</h1>

<p align="center">
  Provider-native packages that turn an AI agent into a social media team.<br />
  Schedule, publish and check analytics through PostSider from Claude, Cursor, OpenCode, Gemini, ChatGPT and self-hosted models.
</p>

<p align="center">
  <a href="https://postsider.com/agent-skills/">Website</a> &middot;
  <a href="#pick-your-provider">Providers</a> &middot;
  <a href="#quick-start">Quick Start</a> &middot;
  <a href="#core-reference">Core Reference</a> &middot;
  <a href="#staying-in-sync">Sync Check</a> &middot;
  <a href="#license">License</a>
</p>

## Pick your provider

| Provider | What you get |
|---|---|
| [Claude](./providers/claude/) | An Anthropic Skill (`SKILL.md`) for claude.ai / Claude Code |
| [Cursor](./providers/cursor/) | MCP config + a `.mdc` project rule |
| [OpenCode](./providers/opencode/) | MCP config + `AGENTS.md` |
| [Gemini CLI](./providers/gemini/) | MCP config |
| [OpenAI / ChatGPT](./providers/openai/) | Five production MCP skills plus the legacy GPT Actions schema |
| [Hermes / self-hosted models](./providers/hermes/) | OpenAI-compatible function-calling tool schema |

Each adapter is a thin "how to connect" layer over the shared playbook in
[`core/`](./core/). It installs in minutes and works with the PostSider MCP
server (`apps/mcp` in [`lumizone/postsider`](https://github.com/lumizone/postsider))
or the public REST API.

## Quick Start

1. In PostSider, go to **Settings > API** and create an API key. The value
   starts with `ps_` and is shown only once.
2. Pick your provider above and follow its install steps.
3. Point the MCP config at your instance: `POSTSIDER_API_KEY` plus
   `POSTSIDER_API_URL` (`https://api.postsider.com`, or your self-hosted base).
4. Tell your agent what to do, for example "schedule a post to X for tomorrow
   at 10am".

## Core Reference

Shared content that every provider adapter links to, maintained in one place:

- [`core/auth.md`](./core/auth.md), how to create and use your org API key
- [`core/tools-reference.md`](./core/tools-reference.md), all 19 MCP tools
- [`core/workflows.md`](./core/workflows.md), step-by-step task playbooks
  (schedule a post, publish now, draft plus approval, check analytics, agency
  overview, error handling)

## Staying in sync

The production source of truth is [`apps/mcp`](https://github.com/lumizone/postsider/tree/main/apps/mcp)
in `lumizone/postsider`. This repository is the public, multi-provider distribution layer.

CI prevents both parts from drifting:

- `core/tools-manifest.json` must match all 19 registered MCP tools; see `scripts/check-tools-sync.mjs`.
- `providers/openai/skills/` must be a byte-for-byte mirror of the five skills shipped by the production MCP; see `scripts/sync-openai-skills.mjs`.

After changing a production skill, refresh this mirror with:

```bash
npm run sync-openai-skills -- ../postsider_app/apps/mcp/skills
```

## License

MIT. See [LICENSE](./LICENSE).
