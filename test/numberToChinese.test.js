/**
 * 数字转中文单元测试
 */
const { numberToChinese } = require('../src/numberToChinese');

const tests = [
    { in: [128930, true], out: '壹拾贰万捌仟玖佰叁拾', name: '128930 大写' },
    { in: [128930, false], out: '十二万八千九百三十', name: '128930 小写' },
    { in: [0, false], out: '零', name: '0' },
    { in: [10, false], out: '十', name: '10 简写' },
    { in: [1010, false], out: '一千零一十', name: '1010 带零的节' },
    { in: [1000, false], out: '一千', name: '1000 去尾零' },
    { in: [-12.3, false], out: '负十二点三', name: '-12.3 负数+小数' },
    { in: [1000000, true], out: '壹佰万', name: '1,000,000 大写' },
];

let failed = 0;
for (const t of tests) {
    let actual;
    try {
        actual = numberToChinese(...t.in);
    } catch (err) {
        console.error(`ERROR ${t.name}: threw`, err);
        failed++;
        continue;
    }
    if (actual !== t.out) {
        console.error(`FAIL ${t.name}: expected="${t.out}" actual="${actual}"`);
        failed++;
    } else {
        console.log(`PASS ${t.name}`);
    }
}

if (failed > 0) {
    console.error(`${failed} tests failed`);
    process.exit(1);
} else {
    console.log('All tests passed');
}
