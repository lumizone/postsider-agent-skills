# PostSider Agent Skills

Provider-native packages that teach an AI agent how to drive
[PostSider](https://postsider.com): schedule and publish social posts,
check analytics, manage channels. Works with its MCP server and public API.

## Pick your provider

| Provider | What you get |
|---|---|
| [Claude](./providers/claude/) | An Anthropic Skill (`SKILL.md`) for claude.ai / Claude Code |
| [Cursor](./providers/cursor/) | MCP config + a `.mdc` project rule |
| [OpenCode](./providers/opencode/) | MCP config + `AGENTS.md` |
| [Gemini CLI](./providers/gemini/) | MCP config |
| [OpenAI / ChatGPT](./providers/openai/) | GPT Actions OpenAPI schema |
| [Hermes / self-hosted models](./providers/hermes/) | OpenAI-compatible function-calling tool schema |

Every provider adapter is a thin "how to connect" layer over the shared
[`core/`](./core/) content:

- [`core/auth.md`](./core/auth.md), how to create and use your org API key
- [`core/tools-reference.md`](./core/tools-reference.md), all 17 tools
- [`core/workflows.md`](./core/workflows.md), step-by-step task playbooks

## Staying in sync

`core/tools-manifest.json` is checked in CI against the real MCP server
source in [`lumizone/postsider`](https://github.com/lumizone/postsider), so
this repo cannot silently drift from what PostSider actually exposes. See
`scripts/check-tools-sync.mjs`.

## License

MIT. See [LICENSE](./LICENSE).
