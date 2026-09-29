## Description:

将教材知识点转化为专业软件级的可视化交互课件——单文件 HTML（应用级外壳 + 电影感质感 + 滑块实时仿真），覆盖生物/历史/地理/物理/化学/数学等含结构、流程、现象的知识点，产出交互课件、知识整合文档与教师说明，并内置自动审核脚本。支持 3D 增强通道（方案 A：Blender 从零建模/素材库模型 → GLB 交互幕 / 仿真视频 / 渲染静帧，three.js 经构建期静态打包 IIFE 内嵌保持单文件离线可用，沙箱/file:// 零 fetch），创建课件时主动询问用户是否启用 3D 通道，3D 幕与 SVG 幕共用外壳无缝混排。

This skill is ready for commercial/non-commercial use.

## Publisher:

[erich1566](https://clawhub.ai/user/erich1566)

### License/Terms of Use:

MIT

## Use Case:

教师、教研员与 AI Agent 使用本技能，将课堂知识点（如血液循环、凸透镜成像、伯努利方程、晨昏线等）制作成可拖拽漫游、滑块驱动的网页交互课件；用于备课、课堂演示、线上教学资源建设。

### Deployment Geography for Use:

Global

## Known Risks and Mitigations:

Risk: AI 生成的写实底图（人体/器官/结构）可能存在解剖学或科学性错误（如心尖朝向、血管连接），误导学生。

Mitigation: 课件交付前必须按技能内的"内容精准自检"逐条与教材核对；对 AI 底图做针对性检查，有误则重新生成或换图，不依赖自动审核脚本替代人工核验。

Risk: 自动审核脚本（audit_courseware.py）仅做静态结构检查（单文件/内嵌图/ID 唯一/键盘/暂停/字号/无障碍），不校验学科内容正确性。

Mitigation: 把审核脚本结果视为"工程可达标"信号，学科准确性须由学科教师独立复核；滑块联动的数值公式建议与教材例题对拍验证。

Risk: 课件在教室离线环境打开时若浏览器过旧，SVG 动画或 `getScreenCTM` 镜头运算可能异常；WebGL 不可用或被禁用时 three.js 3D 幕无法渲染。

Mitigation: 优先使用 Chrome/Edge 最新版；课件已做单文件零外链设计，断网可用；3D 幕加载 GLB 前探测 `WebGLRenderingContext`，不支持时降级显示该幕的 SVG 替代图或提示文字，不让整份课件白屏。

Risk: 沙箱 iframe（如 AI 预览面板）或受限 file:// 环境会拦截 Blob URL 动态 `import()`，导致 3D 幕报 "Failed to fetch"。

Mitigation: v1.2.2 起 three.js 一律构建期静态打包成 IIFE（`window.ThreeBundle`）内联，GLB 用 `GLTFLoader.parse(ArrayBuffer)` 装载，运行时零 fetch、零 Blob URL；打包脚本（bundle_3d.py）已随项目沉淀，交付前须过 node 冒烟 + file:// 实测两道关。

## Reference(s):

- [ClawHub skill page](https://clawhub.ai/erich1566/skills/visual-interactive-courseware)
- [ClawHub publisher profile](https://clawhub.ai/user/erich1566)
- [GitHub source](https://github.com/Erich1566/skills/tree/main/education/visual-interactive-courseware)

## Skill Output:

**Output Type(s):** [text, markdown, html, shell commands, guidance]

**Output Format:** [单文件 HTML 交互课件 + Markdown 知识整合文档与教师说明 + Python 审核报告]

**Output Parameters:** [1D]

**Other Properties Related to Output:** [可能生成 SVG/HTML 交互页面与配套 Markdown 文档，文件均落于用户指定工作目录。]

## Skill Version(s):

1.2.2 (source: artifact frontmatter)

### Changelog

- 1.2.2：3D 通道加载架构根修——废弃 Blob URL 动态 import（沙箱 iframe/file:// 拦截报 Failed to fetch），改为构建期静态打包 IIFE（bundle_3d.py → window.ThreeBundle），GLB 改 GLTFLoader.parse(ArrayBuffer) 零 fetch；管线文档 3.2 节重写打包三步关键 + 三道验收关（node --check / node 冒烟 / file:// 实测）；坑清单新增 #11（three r155+ 物理光照下 EEVEE 材质欠亮需灯光加强+ACES+emissive 提轮廓）与 #12（svg.viewBox.baseVal 恒读 0，漫游引擎必须 getAttribute/setAttribute）
- 1.2.1：SKILL.md 新增"前置安装"指引——增强 3D 需先装 Blender（blender.org）、连接 blender MCP（projects.blender.org/lab/blender_mcp，桥 localhost:9876）、安装 blender-studio 技能（github.com/arjun988/blender-skills 整合版），三项与 visual-interactive-courseware 配合使用；体积红线放宽——GLB/视频总体几十 MB 内均可接受，硬约束改为"维持好的离线 HTML 使用体验"（管线文档第六节新增体验保障清单：加载遮罩、视频 faststart+懒挂载、贴图适压、canvas 占位降级、按需渲染、大文件实机打开测试）
- 1.2.0：新增 3D 增强通道（方案 A）——第零·五步强制询问用户是否启用 Blender+three.js 通道（A 交互 GLB 幕 / B 仿真视频静帧 / A+B / D 纯 SVG），环境自动探测 Blender 可执行文件、blender MCP、blender-studio 技能；新增 references/3d-blender-pipeline.md 完整管线文档（从零建模铁律：设计→参考图→零件级 .py→Blender 执行→渲染验证；three.js Blob URL 单文件内嵌；Blender 5.2 十坑清单；blenderkit 程序化 API；3D/SVG 无缝混排工程约定与 3D 幕回归 7 项）；workflow.md 决策树与模块拆解表接入 3D 分支与 3D 插槽判断
- 1.1.0：新增画布漫游引擎（拖动平移/滚轮缩放/双击复位）与全局镜头联动（知识点/环节/模式切换自动推近）；透明热区标配可见锚点标记；沉淀三大交互冲突处理模式（拖动误触、双击复位 vs 单击、播放状态同步）；回归清单统一为 14 项；审核脚本兼容 SVG `<image>` 无障碍检查

## Ethical Considerations:

用户应在部署前评估本技能是否适合自己的教学环境，复核任何生成或修改的文件，并在使用前应用所在机构的学术规范、安全与合规要求；涉及未成年人与学科准确性时，须由具备资质的教师终审。
