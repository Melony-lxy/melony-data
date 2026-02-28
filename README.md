# melony-data

提供了格式化时间、HTMLEscape 相关功能的工具函数库。

## 功能特性

- ✨ **日期格式化** - 灵活的日期格式化函数
- 🛡️ **HTML转义** - 安全的HTML转义和反转义
- � **数字转中文** - 支持大写金额字或普通小写格式
- �📦 **轻量化** - 无额外依赖，开箱即用
- 🔧 **易于集成** - 一键导入所有工具函数

## 安装

```bash
npm install melony-data
```

## 快速开始

```javascript
const { dateFormat, htmlEscape, htmlUnescape, numberToChinese } = require('melony-data');
```

## API 文档

### dateFormat(date, format)

格式化日期对象为指定格式的字符串。

**参数：**
- `date` (Date) - 日期对象 **(必需)**
- `format` (String) - 格式字符串，默认为 `"yyyy-MM-dd hh:mm:ss"`

**返回值：** 格式化后的日期字符串

**格式说明：**
- `y` - 年份（yyyy表示4位，yy表示2位）
- `M` - 月份（MM表示2位）
- `d` - 日期（dd表示2位）
- `h` - 小时（hh表示2位）
- `m` - 分钟（mm表示2位）
- `s` - 秒钟（ss表示2位）
- `S` - 毫秒（SS表示3位）
- `q` - 季度

**使用示例：**

```javascript
const { dateFormat } = require('melony-data');

const date = new Date('2024-06-15 14:30:45');

// 默认格式
console.log(dateFormat(date)); 
// 输出: "2024-06-15 14:30:45"

// 自定义格式
console.log(dateFormat(date, 'yyyy-MM-dd'));
// 输出: "2024-06-15"

console.log(dateFormat(date, 'yyyy年MM月dd日 hh:mm:ss'));
// 输出: "2024年06月15日 14:30:45"

console.log(dateFormat(date, 'yyyy/MM/dd q季度'));
// 输出: "2024/06/15 2季度"
```

### htmlEscape(str)

将HTML特殊字符转义，防止XSS攻击。

**参数：**
- `str` (String) - 需要转义的字符串 **(必需)**

**返回值：** 转义后的字符串

**转义规则：**
- `&` → `&amp;`
- `<` → `&lt;`
- `>` → `&gt;`
- `"` → `&quot;`
- `'` → `&#39;`

**使用示例：**

```javascript
const { htmlEscape } = require('melony-data');

const html = '<div class="test">Hello & welcome!</div>';

console.log(htmlEscape(html));
// 输出: "&lt;div class=&quot;test&quot;&gt;Hello &amp; welcome!&lt;/div&gt;"
```

### htmlUnescape(str)

将转义后的HTML字符反转义为原始字符串。

**参数：**
- `str` (String) - 需要反转义的字符串 **(必需)**

**返回值：** 反转义后的字符串

**使用示例：**

```javascript
const { htmlUnescape } = require('melony-data');

const escaped = '&lt;div&gt;Hello &amp; Welcome!&lt;/div&gt;';

console.log(htmlUnescape(escaped));
// 输出: "<div>Hello & Welcome!</div>"
```

## 完整使用示例

```javascript
const melonyData = require('melony-data');

// 1. 日期格式化示例
const now = new Date();
console.log(melonyData.dateFormat(now, 'yyyy-MM-dd hh:mm:ss'));

// 2. HTML转义示例
const userInput = '<script>alert("XSS")</script>';
const safe = melonyData.htmlEscape(userInput);
console.log(safe);

// 3. HTML反转义示例
const unescaped = melonyData.htmlUnescape(safe);
console.log(unescaped);
```

## 注意事项

- `dateFormat()` - 仅接受 `Date` 对象，其他类型会返回空字符串并输出警告
- `htmlEscape()` 和 `htmlUnescape()` - 仅接受字符串类型，其他类型会原样返回并输出警告
- `numberToChinese()`
  - 第一个参数支持数字或可解析的数字字符串
  - 第二个参数 `type` 默认 `true` 表示大写金额用字，设置为 `false` 则返回普通小写中文格式
  - 输入不合法（如非数字字符串）时会打印警告并返回原值

## 许可证

ISC

## 版本

1.1.0

## 数字转中文示例

```javascript
const { numberToChinese } = require('melony-data');

console.log(numberToChinese(128930));          // 壹拾贰万捌仟玖佰叁拾  (默认大写)
console.log(numberToChinese(128930, false));   // 十二万八千九百三十  (小写)
console.log(numberToChinese(-12.34, false));   // 负十二点三四
```
