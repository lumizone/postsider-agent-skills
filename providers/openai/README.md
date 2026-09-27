# OpenAI / ChatGPT

## Production MCP skills

[`skills/`](./skills/) mirrors the five workflow skills served by the production PostSider MCP:

- `postsider-agency-operations`
- `postsider-approval-workflow`
- `postsider-calendar-review`
- `postsider-content-publishing`
- `postsider-performance-reporting`

Each skill contains `SKILL.md` and `agents/openai.yaml`. The canonical source is
[`lumizone/postsider/apps/mcp/skills`](https://github.com/lumizone/postsider/tree/main/apps/mcp/skills),
because those files are packaged into the MCP npm tarball and Docker image and discovered by
OpenAI through **Scan Tools**. Do not edit this mirror directly. Change the canonical files,
deploy the MCP, run `npm run sync-openai-skills -- <path-to-postsider>/apps/mcp/skills`, and
then run **Scan Tools** again in the OpenAI plugin portal.

## Legacy Custom GPT Actions

`actions-openapi.yaml` remains available for Custom GPTs that call the PostSider REST API
instead of using the public MCP application. Paste it into the GPT Builder Actions editor,
set authentication to **API Key** under the `apiKey` scheme, and use an organization API key.

For this REST path, use `../../core/workflows.md` as the playbook and translate MCP calls to
the corresponding `/public/v1` operations. The schema alone does not teach call order.
