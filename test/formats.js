var formats = require('../src/formats');
var unit = require('./unit');

unit({
    modules: formats,
    load: function (name) {
        var tests = require('../src/formats/' + name).tests;

        if (typeof tests === 'undefined') {
            return null;
        } else {
            return tests();
        }
    },
    init: function () {
        return {};
    },
    test: function (test, transform, name) {
        var plain = formats[name]()(test.input).filter(function (item) {
            return item.transform;
        }).reduce(function (plain, item) {
            return plain + item.content;
        }, '');

        return plain;
    }
});
