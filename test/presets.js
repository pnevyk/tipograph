var presets = require('../src/presets');
var english = require('../src/languages/english').default;
var unit = require('./unit');

unit({
    modules: presets,
    load: function (name) {
        var tests = require('../src/presets/' + name).tests;

        if (typeof tests === 'undefined') {
            return null;
        } else {
            return tests(english);
        }
    },
    init: function (name) {
        return { language: english, presets: [name] };
    },
    test: function (test, transform) {
        return transform(test.input);
    }
});
