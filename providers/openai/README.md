# OpenAI / ChatGPT

`actions-openapi.yaml` is a Custom GPT Actions schema covering post
scheduling and the Agent Bridge (connectors, inbound content). Paste its
contents into the GPT Builder's Actions editor, set auth to **API Key**
under the `agentToken` scheme, and paste your agent token.

If your ChatGPT setup instead supports MCP connectors directly (Developer
Mode, at the time of writing), use `providers/gemini/settings.json`'s config
shape as a template - the connection details are the same MCP server, only
the config file location differs per client.

Task playbooks: `../../core/workflows.md` - since GPT Actions calls the REST
API directly rather than MCP tools, translate each step: `postsider_list_channels`
becomes `GET /public/v1/integrations`, `postsider_create_post` becomes
`POST /public/v1/posts` with the body shape in `actions-openapi.yaml`, etc.
Add the workflow steps as instructions in the GPT's configuration, not just
the schema - the schema alone does not teach call order.
