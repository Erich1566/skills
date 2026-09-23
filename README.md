# Skills

> 面向 AI Agent（WorkBuddy / Claude Code / OpenClaw 等）的技能集合，按领域分类，即取即用。

每个技能是一个独立目录，包含一份 `SKILL.md`（含 frontmatter 元数据与完整工作流程）及所需脚本。所有技能均不包含任何账号、密钥或令牌，凭据一律通过环境变量传入。

## 技能索引

### 🎨 创意类（creative/）

| 技能 | 版本 | 说明 |
|------|------|------|
| [poetry-folk-adaptation](creative/poetry-folk-adaptation/) | 1.0.0 | 古诗词新民谣改编：将古典诗词改编成成名曲水准的现代新民谣——完整歌词、曲风卡与 AI 音乐 Prompt，承五家笔法，支持单曲/专辑企划 |

### 🎓 教育类（education/）

| 技能 | 版本 | 说明 |
|------|------|------|
| [chaoxing-mcp-oauth](education/chaoxing-mcp-oauth/) | 1.3.0 | 超星智雅（StudyAI）MCP 一键接入：`--setup` 设置工作台（假 code 预校验密钥）、一条命令自动刷新/授权/写配置、`--daemon-once` 计划任务无人值守保活，附 7 类故障速查表 |
| [visual-interactive-courseware](education/visual-interactive-courseware/) | 1.0.0 | 可视化交互课件：把教材知识点做成单文件 HTML 交互课件（应用级外壳+滑块实时仿真+电影感质感+画布漫游/镜头联动），覆盖生物/历史/地理/物理等多学科，含自动审核脚本与教师说明 |

## 目录结构

```
skills/
├── README.md
├── LICENSE
├── creative/                       # 创意类技能
│   └── poetry-folk-adaptation/     # 古诗词新民谣改编
│       ├── SKILL.md
│       └── references/
│           ├── lyric-craft.md      # 填词技艺：五家笔法、钩子技法、语言美学
│           ├── music-style.md      # 新民谣曲风库与 AI 音乐 prompt 写法
│           └── exemplars.md        # 典范作品全文与逐段拆解
└── education/                      # 教育类技能
    ├── chaoxing-mcp-oauth/         # 超星智雅 MCP 一键接入
    │   ├── SKILL.md
    │   ├── skill-card.md           # ClawHub 发布卡片
    │   └── scripts/
    │       ├── chaoxing-mcp-auto.mjs    # ⚡ 一键接入：检查令牌→自动刷新→失败自动授权→写配置→验证
    │       ├── chaoxing-mcp-lab.mjs     # scope 探测实验台（网页粘贴密钥+自动验证）
    │       └── chaoxing-mcp-refresh.mjs # 独立刷新脚本（单次/常驻）
    └── visual-interactive-courseware/ # 可视化交互课件
        ├── SKILL.md
        ├── skill-card.md           # ClawHub 发布卡片
        ├── assets/
        │   └── template.html       # 单文件交互课件 HTML 骨架
        ├── references/
        │   ├── design-guide.md      # 设计指南（画布漫游/镜头联动/四区外壳）
        │   ├── audience-matrix.md   # 学段×学科适配矩阵
        │   ├── subject-examples.md  # 学科拆解模式库
        │   └── workflow.md          # 工作流（含教师说明结构）
        └── scripts/
            └── audit_courseware.py  # 自动审核（10 项检查，≥90 分可交付）
```

## 安装使用

### 方式一：技能市场

- **SkillHub**：搜索「古诗词新民谣改编」或 `poetry-folk-adaptation`；`chaoxing-mcp-oauth`；`visual-interactive-courseware`
- **ClawHub**：搜索 `poetry-folk-adaptation`、`chaoxing-mcp-oauth`、`visual-interactive-courseware`

### 方式二：手动安装

```bash
# 克隆仓库到本地
git clone https://github.com/Erich1566/skills.git

# 将技能目录复制/链接到 Agent 的技能目录
# WorkBuddy: ~/.workbuddy/skills/
cp -r skills/creative/poetry-folk-adaptation ~/.workbuddy/skills/
cp -r skills/education/chaoxing-mcp-oauth ~/.workbuddy/skills/
```

### chaoxing-mcp-oauth 快速上手

```bash
# 【仅首次】设置工作台：浏览器自动弹出，按页面引导填凭据 → 自动授权 → 自动验证
node ~/.workbuddy/skills/chaoxing-mcp-oauth/scripts/chaoxing-mcp-auto.mjs --setup

# 【日常】一键确保连接：令牌有效→跳过；过期→自动刷新；失效→自动弹授权页
node ~/.workbuddy/skills/chaoxing-mcp-oauth/scripts/chaoxing-mcp-auto.mjs

# 【系统级保活】Windows 计划任务每 15 分钟无人值守刷新（只要电脑开着，令牌永不过期）
# 任务名：ChaoxingMCP-KeepAlive
```

## 贡献新技能

欢迎按以下规范提交技能：

1. 在对应分类目录（如 `education/`）下创建 `<skill-name>/` 目录，命名用 kebab-case
2. 必须包含 `SKILL.md`，frontmatter 需含 `name`、`slug`、`version`、`displayName`、`summary`、`license`
3. 脚本放 `scripts/` 子目录；**严禁硬编码任何凭据**（client_id / secret / token / 账号），凭据只走环境变量
4. 提交前请自查文件中不含个人凭据信息

## License

[MIT](LICENSE)
