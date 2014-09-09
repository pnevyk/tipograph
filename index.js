module.exports = {
    Replace : require('./src/replace'),
    Languages : require('./src/languages'),
    createStream : function (options) {
        var Stream = require('./src/stream');
        return new Stream(require('./src/replace'), options);
    }
};