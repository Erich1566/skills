const fs = require('fs');
let html = fs.readFileSync('C:/Users/lenovo/.workbuddy/skills/knowledge-card-generator/assets/mo_card_template.html', 'utf8');
const cards = [
  { tag: '第一章', title: '卡片一', paragraphs: ['第一张卡内容。'], chapterStart: true, image: 'images/a.png' },
  { tag: '第一章', title: '卡片二', paragraphs: ['第二张卡内容。'], quote: '金句' },
  { tag: '第二章', title: '卡片三', paragraphs: ['第三张卡内容。'], chapterStart: true }
];
html = html.replaceAll('{{DECK_TITLE}}', '冒烟测试')
           .replaceAll('{{ACCENT_COLOR}}', '#4A90B8')
           .replaceAll('{{ACCENT_SOFT}}', '#E3F0F7')
           .replaceAll('{{STREAK_DAYS}}', '1')
           .replaceAll('{{TOTAL}}', String(cards.length))
           .replaceAll('{{CARDS_JSON}}', JSON.stringify(cards));
fs.writeFileSync(__dirname + '/smoke.html', html);

// 1. JS 语法检查
const m = html.match(/<script>([\s\S]*?)<\/script>/);
new Function(m[1]);
console.log('PASS - JS 语法 OK');

// 2. 关键能力断言
const asserts = [
  ['chapterStart 章节标记逻辑存在', html.includes("c.chapterStart")],
  ['可点击跳转存在', html.includes("seg.addEventListener('click'")],
  ['动态 total 渲染存在', html.includes('totalEl.textContent = total')],
  ['悬停提示存在', html.includes('seg.title')],
  ['DECK_TITLE 常量定义存在', html.includes('const DECK_TITLE')],
  ['STREAK_DAYS 常量定义存在', html.includes('const STREAK_DAYS')],
  ['章节暖橙 CSS 存在', html.includes('.seg.chapter')],
  ['fitCard 智能缩放存在', html.includes('function fitCard')],
];
let fail = 0;
asserts.forEach(([n, ok]) => { if (!ok) fail++; console.log((ok ? 'PASS' : 'FAIL') + ' - ' + n); });

// 3. 无残留占位符
const leftover = html.match(/\{\{[A-Z_]+\}\}/g);
console.log(leftover ? 'FAIL - 残留占位符: ' + leftover.join(',') : 'PASS - 占位符全部替换');
process.exit(fail ? 1 : 0);
