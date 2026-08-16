# Workflows

Concrete tool-call sequences for the tasks a PostSider agent is asked to do
most often. Tool names are MCP tool names (see `tools-reference.md`); when
using a non-MCP provider (OpenAI, Hermes), replace each step with the
matching REST call noted in that provider's adapter.

## Schedule a post

1. `postsider_list_channels` - get channel ids (cache these per conversation,
   they rarely change).
2. `postsider_find_slot` with the target `channelId` - get the next free
   queue slot, or use a specific date the user gave you.
3. `postsider_upload_media_from_url` for each image/video, if any - do this
   BEFORE creating the post, and pass the returned media objects as `images`.
4. `postsider_create_post` with `type: "schedule"` and the `date` from step 2
   (or the user's date). Use `idempotencyKey` if you might retry the same
   request (e.g. after a timeout) - reusing it returns the original result
   instead of creating a duplicate.
5. `postsider_get_post_missing_fields` on the returned post id - surface any
   validation problems to the user before considering the task done.

## Publish immediately

Same as above with `type: "now"` at step 4 and no `postsider_find_slot` call.

## Save a draft for human review

1-3 as above.
4. `postsider_create_post` with `type: "draft"`.
5. `postsider_request_approval` with the returned post id.
6. Tell the user it is pending; do not report it as published. Optionally
   poll `postsider_get_approval_status` if the user asks for the outcome
   later in the same session.

## Check how a post performed

1. `postsider_get_post` to confirm it published (state, not just that it was
   created).
2. `postsider_get_post_analytics` with the post id.

## Morning / status check for an agency account

1. `postsider_get_agency_overview` (or `postsider_get_customer_report` for a
   single client) - this alone answers "what's queued, what failed, what
   needs approval" without further calls.
2. Only drill into `postsider_get_notifications` or `postsider_get_post` for
   items the overview flagged as errored.

## Error handling

- MCP tool calls return `isError: true` with a plain-text message on
  failure - surface that message to the user rather than retrying blindly.
- The underlying REST API returns normal HTTP status codes: `401` for a
  missing/invalid/revoked key, `402` if the plan does not include the public
  API, `400`/`422` for validation problems, `4xx` for most other request
  errors, and `5xx` for server-side failures. Check the HTTP status, not just
  that a response arrived.
- Never invent a channel id, post id, or media object - always obtain them
  from a prior tool call in the same task.
