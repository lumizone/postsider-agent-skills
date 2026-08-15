# Tool reference

All 17 tools PostSider's MCP server (`apps/mcp`) exposes, generated from
[`tools-manifest.json`](./tools-manifest.json). The source of truth is
`apps/mcp/src/index.ts` in [`lumizone/postsider`](https://github.com/lumizone/postsider).
If you are not using MCP (see `providers/openai` or `providers/hermes`), the
same operations are available directly over the `/public/v1` REST API.

## Read-only

| Tool | What it does |
|---|---|
| `postsider_list_channels` | List connected channels (integrations). Call first to get channel ids. |
| `postsider_get_agency_overview` | Org-wide overview: clients, channels, queue, drafts, errors, pending approvals. |
| `postsider_get_customer_report` | Same overview, scoped to one customer/group. |
| `postsider_list_groups` | List channel groups (customers). |
| `postsider_find_slot` | Next free scheduling slot for a channel, per its posting queue. |
| `postsider_list_posts` | List posts in a date range. |
| `postsider_get_post_missing_fields` | Per-channel validation problems for a post. |
| `postsider_get_post` | Full post details, including publish error if any. |
| `postsider_get_post_analytics` | Performance analytics for one post. |
| `postsider_get_channel_analytics` | Account-level analytics for a channel. |
| `postsider_get_notifications` | Recent org notifications (failures, reconnect needed). |
| `postsider_get_approval_status` | Approval status of a draft sent for review. |

## Write

| Tool | What it does |
|---|---|
| `postsider_upload_media_from_url` | Import an image/video into the media library from a URL. |
| `postsider_create_post` | Create a post: draft, scheduled, or immediate, across one or more channels. |
| `postsider_update_post_status` | Move a post between statuses (e.g. draft to queue). |
| `postsider_delete_post` | Permanently delete a post. |
| `postsider_request_approval` | Send a draft into the human approval queue. |

Full input schemas: read `tools-manifest.json`, or ask your MCP client to list
tools (every client does this automatically on connect).
