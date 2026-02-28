
const date = require('./src/dateFormat');
const htmlEscape = require('./src/htmlEascape');
const numberToChinese = require('./src/numberToChinese');

module.exports = {
    ...date,
    ...htmlEscape,
    ...numberToChinese
};