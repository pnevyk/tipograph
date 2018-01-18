var languages = require('../src/languages');
var unit = require('./unit');

unit({
    modules: languages,
    load: function (name) {
        var tests = require('../src/languages/' + name).tests;

        if (typeof tests === 'undefined') {
            return null;
        } else {
            return tests();
        }
    },
    init: function (name) {
        return { language: languages[name], presets: ['language'] };
    },
    test: function (test, transform) {
        return transform(test.input);
    }
});
