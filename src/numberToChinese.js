/**
 * 一万亿数字转换为中文
 * @param {*} num 数字
 * @param {*} type 是否繁体中文，默认为true（金额用字），false为小写中文（普通中文）
 * @returns 中文字符串
 */
const numberToChinese = (num, type = true) => {
    if (num === null || num === undefined) return num;
    // 支持数字或数字字符串
    let str = String(num).trim();
    if (str === '') return num;

    let negative = false;
    if (str[0] === '-') {
        negative = true;
        str = str.slice(1);
    }

    // 如果传入的是带逗号的数字，去掉逗号
    str = str.replace(/,/g, '');

    if (!/^\d+(?:\.\d+)?$/.test(str)) {
        const n = Number(num);
        if (typeof n !== 'number' || isNaN(n)) {
            console.warn('numberToChinese: input is not a valid number');
            return num;
        }
        str = String(Math.abs(n));
        negative = n < 0;
    }

    const smallNums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const bigNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    // 改为: type=true => 大写（金额用字），type=false => 小写（普通中文）
    const digits = type ? bigNums : smallNums;

    const units = type ? ['', '拾', '佰', '仟'] : ['', '十', '百', '千'];
    const sectionUnits = ['', '万', '亿', '兆'];

    const [integerPart, decimalPart] = str.split('.');

    const intToChinese = (intStr) => {
        if (intStr === '0') return digits[0];
        let result = '';
        // 从低位每4位一组
        let sectionIndex = 0;
        // 标记上一（低）节是否全为0，用来决定是否在较高节前插入零
        let lowerSectionAllZero = false;
        for (let i = intStr.length; i > 0; i -= 4) {
            const start = Math.max(0, i - 4);
            const section = intStr.slice(start, i);
            let sectionChinese = '';
            let zeroFlag = false; // 当前节内部是否出现过零
            for (let j = 0; j < section.length; j++) {
                const digit = Number(section[section.length - 1 - j]); // 从低位开始处理
                if (digit === 0) {
                    zeroFlag = true;
                } else {
                    if (zeroFlag) {
                        sectionChinese = digits[0] + sectionChinese;
                        zeroFlag = false;
                    }
                    sectionChinese = digits[digit] + units[j] + sectionChinese;
                }
            }
            // 去掉节内末尾可能多出的零
            while (sectionChinese.length > 1 && sectionChinese.endsWith(digits[0])) {
                sectionChinese = sectionChinese.slice(0, -1);
            }

            if (sectionChinese !== '') {
                if (lowerSectionAllZero) result = digits[0] + result;
                result = sectionChinese + sectionUnits[sectionIndex] + result;
                lowerSectionAllZero = false;
            } else {
                // 本节全为0，标记以便更高节在有数字时插入零
                lowerSectionAllZero = true;
            }

            sectionIndex++;
        }

        // 去掉整体末尾多余的零（但保留单个零）
        while (result.length > 1 && result.endsWith(digits[0])) {
            result = result.slice(0, -1);
        }

        // 处理 "一十X" 简写为 "十X"（仅在小写模式下常用）
        if (!type && result.startsWith(smallNums[1] + '十')) {
            result = result.replace(smallNums[1] + '十', '十');
        }

        return result;
    };

    const decToChinese = (decStr) => {
        if (!decStr) return '';
        let res = '点';
        for (const ch of decStr) {
            res += digits[Number(ch)];
        }
        return res;
    };

    const intPartChinese = intToChinese(integerPart.replace(/^0+/, '') || '0');
    const decPartChinese = decimalPart ? decToChinese(decimalPart) : '';

    const prefix = negative ? (type ? '负' : '负') : '';

    return prefix + intPartChinese + decPartChinese;
};

// 导出函数以便测试
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        numberToChinese
    };
}
