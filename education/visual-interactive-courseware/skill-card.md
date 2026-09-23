## Description:

将教材知识点转化为专业软件级的可视化交互课件——单文件 HTML（应用级外壳 + 电影感质感 + 滑块实时仿真），覆盖生物/历史/地理/物理/化学/数学等含结构、流程、现象的知识点，产出交互课件、知识整合文档与教师说明，并内置自动审核脚本。

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

Risk: 课件在教室离线环境打开时若浏览器过旧，SVG 动画或 `getScreenCTM` 镜头运算可能异常。

Mitigation: 优先使用 Chrome/Edge 最新版；课件已做单文件零外链设计，断网可用。

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

1.1.0 (source: artifact frontmatter)

### Changelog

- 1.1.0：新增画布漫游引擎（拖动平移/滚轮缩放/双击复位）与全局镜头联动（知识点/环节/模式切换自动推近）；透明热区标配可见锚点标记；沉淀三大交互冲突处理模式（拖动误触、双击复位 vs 单击、播放状态同步）；回归清单统一为 14 项；审核脚本兼容 SVG `<image>` 无障碍检查

## Ethical Considerations:

用户应在部署前评估本技能是否适合自己的教学环境，复核任何生成或修改的文件，并在使用前应用所在机构的学术规范、安全与合规要求；涉及未成年人与学科准确性时，须由具备资质的教师终审。
