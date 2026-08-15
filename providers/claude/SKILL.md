---
name: postsider
description: "Use when the user wants to schedule, publish, or review social media posts through PostSider, check post/channel analytics, or manage connected channels. Trigger phrases: \"schedule a post\", \"post this to X/LinkedIn/...\", \"check my PostSider analytics\", \"what's in my queue\"."
---

# PostSider

PostSider is a social media scheduling platform. This skill connects to a
user's PostSider organization over MCP and drives it through natural
language requests.

## Setup (one time)

1. In PostSider: **Settings > Developers > Agent Tokens > New Token**. Grant
   `PUBLISH` (and `ANALYTICS` if the user wants analytics questions
   answered). See the auth guide below for what each capability unlocks.
2. Add the MCP server to your Claude config (Claude Desktop
   `claude_desktop_config.json`, or Claude Code `.mcp.json`):

```json
{
  "mcpServers": {
    "postsider": {
      "command": "npx",
      "args": ["-y", "@postsider/mcp"],
      "env": {
        "POSTSIDER_API_KEY": "agt_...",
        "POSTSIDER_API_URL": "https://api.postsider.com"
      }
    }
  }
}
```

For a self-hosted instance, set `POSTSIDER_API_URL` to
`https://<your-domain>/api`.

## How to use PostSider tools

Full auth model: https://github.com/lumizone/postsider-agent-skills/blob/main/core/auth.md
Tool reference: https://github.com/lumizone/postsider-agent-skills/blob/main/core/tools-reference.md
Task playbooks (schedule, publish now, draft + approval, analytics, agency
overview, error handling): https://github.com/lumizone/postsider-agent-skills/blob/main/core/workflows.md

Follow the workflows guide step by step for the task the user asked for. Do not
skip the "get channel ids" / "get a free slot" steps even if you think you
remember them from earlier in the conversation - channels and queues change.

## What NOT to do

- Do not publish (`type: "now"` or `type: "schedule"`) without the user
  having stated or approved the content and target channel(s) in this
  conversation.
- Do not delete a post (`postsider_delete_post`) without explicit
  confirmation of which post.
- If the organization has HITL mode on, posts you create will land as
  drafts regardless of the `type` you pass - tell the user that, don't
  claim it was published.
