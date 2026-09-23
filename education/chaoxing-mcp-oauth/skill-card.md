## Description:

Guides WorkBuddy users through connecting Chaoxing StudyAI MCP with OAuth authorization-code setup, local token exchange, mcp.json configuration, refresh-token upkeep, and troubleshooting for common authorization errors.

This skill is ready for commercial/non-commercial use.

## Publisher:

[erich1566](https://clawhub.ai/user/erich1566)

### License/Terms of Use:

MIT-0

## Use Case:

Developers and WorkBuddy users use this skill to configure Chaoxing StudyAI MCP access, complete OAuth authorization, keep tokens refreshed, and recover from common scope or grant-version failures.

### Deployment Geography for Use:

Global

## Known Risks and Mitigations:

Risk: Long-lived StudyAI OAuth credentials may remain in local WorkBuddy configuration and token files without enforced owner-only permissions.

Mitigation: Restrict ~/.workbuddy/mcp.json and ~/.workbuddy/chaoxing-studyai-token.json to the local account owner, avoid broad backups or shared machines, and revoke or reset Chaoxing credentials if exposure is suspected.

Risk: Leaving the local authorization lab running after setup can allow repeated authorization attempts that invalidate prior tokens.

Mitigation: Stop the lab server after a successful tools/list check and use the refresh-token flow for upkeep or one-time recovery.

## Reference(s):

- [ClawHub skill page](https://clawhub.ai/erich1566/skills/chaoxing-mcp-oauth)
- [ClawHub publisher profile](https://clawhub.ai/user/erich1566)

## Skill Output:

**Output Type(s):** [text, markdown, shell commands, configuration, guidance]

**Output Format:** [Markdown guidance with inline shell commands and JSON configuration examples]

**Output Parameters:** [1D]

**Other Properties Related to Output:** [May guide creation or update of local WorkBuddy MCP configuration and token state files.]

## Skill Version(s):

1.0.0 (source: server evidence release.version and artifact frontmatter)

## Ethical Considerations:

Users should evaluate whether this skill is appropriate for their environment, review any generated or modified files before relying on them, and apply their organization's safety, security, and compliance requirements before deployment.
