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
| [knowledge-card-generator](education/knowledge-card-generator/) | 2.0.0 | Mo卡片风格知识卡片生成器：单文件 HTML 卡片集（米色背景+白卡+大引号+游戏化），支持章节导航（数据驱动 chapterStart+暖橙进度条）、进度条点击跳卡、动态总数渲染、fitCard 智能缩放单屏完整、ImageGen 配图工作流与 node 交付校验，源自 40 卡 AI 通识课实战 |
| [visual-interactive-courseware](education/visual-interactive-courseware/) | 1.2.2 | 可视化交互课件：把教材知识点做成单文件 HTML 交互课件（应用级外壳+滑块实时仿真+电影感质感+画布漫游/镜头联动），支持 3D 增强通道（Blender 建模→GLB 交互幕/仿真视频，three.js 构建期静态打包零 fetch），覆盖生物/历史/地理/物理等多学科，含自动审核脚本与教师说明 |
| [sim3d-webgl-training](education/sim3d-webgl-training/) | 2.0.0 | 3D虚拟仿真实训系统生成器：零依赖单文件 WebGL2 PBR 渲染（双画布+GGX+ACES）+ 6 类程序化 CAD 曲面 + 3D 关节技师 + 四维教学闭环（结构拆解/原理仿真/SOP 工卡/排故考核）；v2.0 起 SIM_CONFIG 数据驱动架构（部件规格/可测电气值/工卡分值/故障盲考/工况/相机/限位单源配置）+ 虚拟仪器矩阵（万用表 4 模式/示波器/能力雷达）+ 遥测条，内置内容密度审核脚本 |

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
    ├── knowledge-card-generator/   # Mo卡片风格知识卡片生成器
    │   ├── SKILL.md
    │   └── assets/
    │       ├── mo_card_template.html # 卡片集 HTML 骨架（章节导航/点击跳卡/fitCard 内置）
    │       └── smoke_test.js         # 模板冒烟测试（10 项断言）
    ├── sim3d-webgl-training/         # 3D虚拟仿真实训系统生成器
    │   ├── SKILL.md                   # 触发条件 + 七步法工作流 + 内容密度红线
    │   ├── skill-card.md              # ClawHub 发布卡片
    │   ├── references/
    │   │   ├── domain-data.md         # ★ SIM_CONFIG 数据契约全量模板 + IRB 6700 真实数据范例
    │   │   ├── core-engine.md         # 双画布骨架 + Mat4 + PBR 着色器 + 主循环 + 音效
    │   │   ├── cad-library.md         # MeshBuilder + 6 类 CAD 曲面 + 3D 关节技师
    │   │   ├── rendering-rules.md     # 双通道渲染 + 粒子 + 引线标注 + 质感细节清单
    │   │   ├── teaching-modes.md      # 教学闭环 + SOP 校验 + 仪器矩阵 + 遥测条
    │   │   └── gotchas.md             # 弱模型防呆清单 + 交付 checklist
    │   └── scripts/
    │       └── audit_sim3d.py         # 静态审核脚本（引擎必需项 + 内容密度基线）
    └── visual-interactive-courseware/ # 可视化交互课件
        ├── SKILL.md
        ├── skill-card.md           # ClawHub 发布卡片
        ├── assets/
        │   └── template.html       # 单文件交互课件 HTML 骨架
        ├── references/
        │   ├── 3d-blender-pipeline.md # 3D 增强通道完整管线（含 12 坑清单）
        │   ├── design-guide.md      # 设计指南（画布漫游/镜头联动/四区外壳）
        │   ├── audience-matrix.md   # 学段×学科适配矩阵
        │   ├── subject-examples.md  # 学科拆解模式库
        │   └── workflow.md          # 工作流（含教师说明结构）
        └── scripts/
            ├── audit_courseware.py  # 自动审核（10 项检查，≥90 分可交付）
            └── bundle_3d.py         # three.js 静态打包（沙箱/file:// 零 fetch，v1.2.2 新增）
```

## 安装使用

### 方式一：技能市场

- **SkillHub**：搜索「古诗词新民谣改编」或 `poetry-folk-adaptation`；`chaoxing-mcp-oauth`；`knowledge-card-generator`；`visual-interactive-courseware`
- **ClawHub**：搜索 `poetry-folk-adaptation`、`chaoxing-mcp-oauth`、`knowledge-card-generator`、`visual-interactive-courseware`

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

### visual-interactive-courseware v1.2.2 更新要点

- **3D 通道加载架构根修**：废弃 Blob URL 动态 `import()`（沙箱 iframe / file:// 环境拦截报 `Failed to fetch`），改为构建期静态打包——`scripts/bundle_3d.py` 把 three.js + OrbitControls + BufferGeometryUtils + GLTFLoader 打成单 IIFE（`window.ThreeBundle`），运行时零 fetch；GLB 用 `GLTFLoader.parse(ArrayBuffer)` 直载
- **新增 3D 实测坑清单 #11/#12**：three r155+ 物理光照下 EEVEE 导出材质欠亮（灯光加强 + ACES toneMapping + emissive 提轮廓）；`svg.viewBox.baseVal` 在部分 Chromium 环境恒读 0（漫游引擎改 getAttribute/setAttribute）

## 贡献新技能

欢迎按以下规范提交技能：

1. 在对应分类目录（如 `education/`）下创建 `<skill-name>/` 目录，命名用 kebab-case
2. 必须包含 `SKILL.md`，frontmatter 需含 `name`、`slug`、`version`、`displayName`、`summary`、`license`
3. 脚本放 `scripts/` 子目录；**严禁硬编码任何凭据**（client_id / secret / token / 账号），凭据只走环境变量
4. 提交前请自查文件中不含个人凭据信息

## License

[MIT](LICENSE)
