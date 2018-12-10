var presets = require('../src/presets');
var english = require('../src/languages/english').default;
var unit = require('./unit');

unit({
    modules: { changes: null },
    load: function () {
        return [
            {
                description: 'substitute',
                input: '"lorem ipsum" "dolor"',
                expected: JSON.stringify([
                    [[0, 1], [0, 1]],
                    [[12, 13], [12, 13]],
                    [[14, 15], [14, 15]],
                    [[20, 21], [20, 21]]
                ])
            },
            {
                description: 'shrink',
                input: 'lorem --- ipsum---dolor',
                expected: JSON.stringify([
                    [[5, 10], [5, 8]],
                    [[15, 18], [13, 16]]
                ])
            },
            {
                description: 'multiple rules',
                input: '"lorem --- ipsum"',
                expected: JSON.stringify([
                    [[0, 1], [0, 1]],
                    [[6, 11], [6, 9]],
                    [[16, 17], [14, 15]]
                ])
            }
            // TODO: write some more complex test cases, possibly testing some corner cases
        ];
    },
    init: function () {
        return { language: english, presets: Object.keys(presets) };
    },
    test: function (test, transform) {
        return transform(test.input, function (converted, changes) {
            return JSON.stringify(changes);
        });
    }
});
