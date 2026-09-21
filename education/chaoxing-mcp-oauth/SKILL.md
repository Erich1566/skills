---
name: chaoxing-mcp-oauth
slug: chaoxing-mcp-oauth
title: 超星智雅 MCP 一键接入
displayName: 超星智雅 MCP 一键接入
summary: 三步接入超星智雅（StudyAI）MCP：本机回调授权换 JWT、自动写入 mcp.json、refresh_token 常驻保活，附 7 类故障速查表。
description: 指导用户将超星智雅/StudyAI MCP 服务接入 WorkBuddy 的完整流程：引导用户提供 OAuth2 凭据、本机起回调服务完成授权码换 JWT、写入 mcp.json、配置 refresh_token 常驻保活，并处理 grant_version_stale / scope_denied / invalid_scope 等故障。适用于用户要求连接超星智雅 MCP、令牌过期修复、或重新授权的场景。
version: 1.0.0
tags: ["chaoxing", "mcp", "oauth", "studyai", "education"]
license: MIT
metadata: {"clawdbot":{"emoji":"🎓","os":["linux","darwin","win32"]}}
agent_created: true
---

# 超星智雅 / StudyAI MCP 接入

帮助用户把超星智雅（StudyAI）的 MCP 服务接入 WorkBuddy。平台不提供 OAuth 发现文档，WorkBuddy 内置 OAuth 流程不可用，因此必须**本机起回调服务、人工授权换 JWT、以静态 Bearer 头写入 mcp.json、再用 refresh_token 常驻保活**。本技能自带两个可复用脚本（`scripts/` 目录）。

**安全红线（必须遵守）**：
- 绝不把用户的 client_id / client_secret / 令牌 / 账号信息写入本技能任何文件、对话输出或日志
- 凭据只通过**环境变量**（`CX_CLIENT_ID` / `CX_CLIENT_SECRET`）或命令行参数进入脚本
- 提醒用户：密钥泄露时在智雅「密钥管理 → 重置密钥」作废重来

## 平台关键事实（实测结论，勿重复探测）

- MCP 端点：`https://api.chaoxing.com/openai/studyai/data`，仅 POST，JSON-RPC 2.0
- 授权端点：`https://api.chaoxing.com/auth/oauth2/authorize`（302 → passport2.chaoxing.com，用户需登录学习通）
- 令牌端点：`https://api.chaoxing.com/auth/oauth2/token`
- 仅支持 **authorization_code** 授权码模式（client_credentials → `unauthorized_client`，password → `unsupported_grant_type`）
- 无 `.well-known` 发现文档 → WorkBuddy 内置 OAuth 不可用；WorkBuddy 的 mcp.json 也不支持 OAuth 端点字段，但 **headers 里已有 Authorization 时客户端会跳过内置 OAuth**
- access_token 是 JWT，寿命 1 小时；refresh_token 长期有效，刷新不递增授权版本

## 两大坑（必读）

### 坑一：scope
- scope = 用户建密钥时「选择接口」对应的数据范围技术标识，多为**三段式**（如 `<域>:<资源>:<动作>`），完整值只显示在智雅凭证页「数据范围（Scope）」一栏
- 不带 scope → 误导性报错 `access_denied / OAuth 2.0 Parameter: client_id`
- scope 值错误 → `invalid_scope / OAuth 2.0 Parameter: scope`
- 令牌端点**不校验** scope，只能在授权端点借浏览器登录态验证
- **首要动作永远是：让用户去智雅凭证页抄「数据范围」原文**，填进实验台的自由输入框

### 坑二：grant_ver
- 每走一次完整授权码流程，服务端授权版本 +1，**旧令牌立即作废**（403 `grant_version_stale`）
- 用户重复点授权按钮会把好令牌点失效 → 拿到有效令牌后**立刻停用实验台页面**
- refresh_token 刷新不递增版本，是唯一安全的续期方式

## 接入流程

### 第 0 步：收集凭据（问用户要三样）
1. client_id 与 client_secret（智雅 → 个人工作台 → 权限管理 → 第三方授权管理 → 密钥管理）
2. 凭证页「数据范围（Scope）」一栏的原文
3. 确认回调地址已登记：在授权记录「继续配置」里填 `http://localhost:8765/callback` 并保存（**先填回调、再点授权**，顺序反了会 400）

### 第 1 步：启动授权实验台
```bash
CX_CLIENT_ID=<id> CX_CLIENT_SECRET=<secret> node <技能目录>/scripts/chaoxing-mcp-lab.mjs
```
- 本机起 `http://localhost:8765/lab` 页面（后台运行），把页面链接给用户
- 用户点对应 scope 的按钮 → 登录学习通 → 点「确认授权」→ 跳回本机回调
- 脚本自动：换 JWT → 导出令牌对到 `~/.workbuddy/chaoxing-studyai-token.json` → 写 `~/.workbuddy/mcp.json`（`chaoxing-studyai` 条目）→ 跑 `tools/list` 验证
- 首次建议先用自由输入框填凭证页抄来的 scope；页面也内置了常见候选值
- **成功拿到 tools/list 200 后，立即停掉实验台进程**，防止用户再点导致 grant_ver 变化

### 第 2 步：启动保活守护
```bash
CX_CLIENT_ID=<id> CX_CLIENT_SECRET=<secret> node <技能目录>/scripts/chaoxing-mcp-refresh.mjs
```
- 每 55 分钟用 refresh_token 刷新并回写 mcp.json（后台运行）
- `--once` 单次刷新后退出；`--token <文件>` 首次导入令牌对

### 第 3 步：让用户激活
WorkBuddy「连接器管理 → 右上角自定义连接器」对 `chaoxing-studyai` 点「信任」（MCP 配置不会自动生效）。

## mcp.json 条目格式

```json
{
  "mcpServers": {
    "chaoxing-studyai": {
      "type": "http",
      "url": "https://api.chaoxing.com/openai/studyai/data",
      "headers": { "Authorization": "Bearer <JWT>" },
      "description": "超星智雅 StudyAI（OAuth2 授权码 + 静态 Bearer）"
    }
  }
}
```

## 故障速查

| 报错 | 原因 | 处置 |
|---|---|---|
| `access_denied / client_id` | 授权请求没带 scope | 用实验台带 scope 重试 |
| `invalid_scope` | scope 值不对 | 从智雅凭证页抄「数据范围」原文，自由输入框填入 |
| 403 `scope_denied` | 令牌 scope 不含所需范围（如只授了 openid） | 用正确 scope 重新授权一次 |
| 403 `grant_version_stale` | 之后又走过一次完整授权 | 跑 refresh 脚本 `--once` 刷新即可恢复 |
| 换令牌失败 `invalid_grant` | code 过期/已用，或智雅登记的回调与请求不一致 | 重新授权；核对回调地址 = `http://localhost:8765/callback` |
| 授权页 400（Whitelabel Error Page） | 回调地址未在智雅登记 | 先在智雅「继续配置」里填回调地址再授权 |
| 多 scope 写法 | 平台只认**空格**分隔，逗号会 `invalid_scope` | 合并值用空格 |

## 可用工具（授权 StudyAI 数据范围后）

- `get_course_clazz_list(courseId)` — 课程下的班级列表
- `get_my_teach_course_list()` — 我教的课程列表
- `studyAi_agent_talk(courseid, clazzids, content)` — 与课程智能体流式对话

## 会话恢复注意

保活守护随会话结束而停止。若新会话中 MCP 调用报 401/403，先跑 `node <技能目录>/scripts/chaoxing-mcp-refresh.mjs --once`（带环境变量凭据），通常即可恢复，无需重新走完整授权。
