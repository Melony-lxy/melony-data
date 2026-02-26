
const date = require('./src/dateFormat');
const htmlEscape = require('./src/htmlEascape');

module.exports = {
    ...date,
    ...htmlEscape
};