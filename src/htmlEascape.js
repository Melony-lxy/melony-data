/**
 * HTML转义
 * @param {*} str type: String
 * @returns 转义后的字符串
 */
function htmlEscape(str) {
    if (typeof str !== 'string') {
        console.warn('htmlEscape: input is not a string');
        return str;
    }
    return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * HTML反转义
 * @param {*} str type: String
 * @returns 反转义后的字符串
 */

function htmlUnescape(str) {
    if (typeof str !== 'string') {
        console.warn('htmlUnescape: input is not a string');
        return str;
    }
    return str.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, '\'');
}

module.exports = {
    htmlEscape,
    htmlUnescape
};