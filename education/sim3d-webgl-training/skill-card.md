## Description:

生成零外部依赖、单文件 HTML 的 3D 高仿真虚拟仿真实训系统——底层原生 WebGL2 硬件加速 PBR 渲染（GGX + 三点工业布光 + ACES 色调映射），顶层 Canvas 2D 画矢量引线标注与虚拟仪器，配合 Web Audio 合成音效。内置 6 类程序化 CAD 曲面生成器（圆柱/放样/弹簧/弯管/倒角盒/剖切壳）、3D 关节技师人物（PPE 装备联动）、四维教学闭环（结构拆解/原理仿真/SOP 工卡/故障排故考核）。v2.0 起采用 SIM_CONFIG 数据驱动架构：全部领域数据（部件规格/可测电气值/工卡分值/故障盲考/工况/相机预设/关节限位）集中于声明式配置，内容密度高而不碰渲染代码；内置静态审核脚本对内容密度基线自动检测。严禁引用 three.js 等外部 CDN，离线教室即开即用。

This skill is ready for commercial/non-commercial use.

## Publisher:

[erich1566](https://clawhub.ai/user/erich1566)

### License/Terms of Use:

MIT

## Use Case:

职业院校教师、实训教研员与 AI Agent 使用本技能，为设备类课程（内燃机、新能源汽车、工业机器人、民航机务/安检/客舱、无人机、空港管理等）快速制作"结构拆解 + 原理仿真 + SOP 实操 + 排故考核"四位一体的 3D 虚拟仿真实训页面；用于实训备课、课堂演示、技能考核与线上实训资源建设。产出为单文件 HTML，学生端零安装、离线可用。

### Deployment Geography for Use:

Global

## Known Risks and Mitigations:

Risk: AI 生成的 3D 模型与工程参数（尺寸、转矩、电压、标准号）可能存在错误，误导教学。

Mitigation: 技能强制"第 0.5 步领域数据准备"——写代码前必须 WebSearch 检索真实型号规格与国标/ISO 标准号；交付前用内置 audit_sim3d.py 检测内容密度基线（部件≥8、specs≥4 行、testPoints 8 值、标准引用等），学科准确性仍建议由专业教师复核关键数值。

Risk: 单文件 HTML 体积大（2000-3000 行），弱模型单次生成会截断出残品。

Mitigation: 防截断铁律已固化——超过 1500 行必须用 Python 分模块拼接生成（每段独立字符串变量最后 write），禁止一次性直出全文。

Risk: 教室老旧电脑或禁用 WebGL 的环境下 3D 场景无法渲染。

Mitigation: 技能要求探测 WebGL2/WebGL1 能力并给出友好降级提示；所有教学内容（SOP 工卡、故障库、仪器读数公式）均以 DOM/Canvas 2D 承载，3D 不可用时教学闭环主体仍可进行。

Risk: 自动审核脚本仅做静态结构检查（引擎必需项/防呆项/内容密度），不校验渲染视觉质量与交互手感。

Mitigation: 交付前必须执行无头浏览器验证（Console 0 错误 + 多视角截图 + 交互回归），截图像素统计（avgLum/brightPct/色彩多样性）用于排查黑屏/过暗/取景过近。

## Reference(s):

- [ClawHub skill page](https://clawhub.ai/erich1566/skills/sim3d-webgl-training)
- [ClawHub publisher profile](https://clawhub.ai/user/erich1566)
- [GitHub source](https://github.com/Erich1566/skills/tree/main/education/sim3d-webgl-training)

## Skill Output:

**Output Type(s):** [text, markdown, html, shell commands, guidance]
