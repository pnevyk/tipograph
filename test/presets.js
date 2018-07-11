var presets = require('../src/presets');
var english = require('../src/languages/english').default;
var unit = require('./unit');

var custom = {
    rule: function () {
        return [
            [/-([a-z])/g, function (match, letter) {
                return letter.toUpperCase();
            }]
        ];
    },
    tests: function () {
        return [{
            description: 'test custom rules',
            input: 'snake-case-style',
            expected: 'snakeCaseStyle'
        }];
    }
};

unit({
    modules: Object.assign({}, presets, { custom: null }),
    load: function (name) {
        if (name !== 'custom') {
            var tests = require('../src/presets/' + name).tests;

            if (typeof tests === 'undefined') {
                return null;
            } else {
                return tests(english);
            }
        } else {
            return custom.tests(english);
        }
    },
    init: function (name) {
        if (name !== 'custom') {
            return { language: english, presets: [name] };
        } else {
            return { language: english, presets: [custom.rule] };
        }
    },
    test: function (test, transform) {
        return transform(test.input);
    }
});
