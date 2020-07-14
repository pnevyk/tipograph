var presets = require('../src/presets');
var english = require('../src/languages/english').default;
var unit = require('./unit');
const { option } = require('yargs');

var doubleOpen = english.quotes[0][0];
var doubleClose = english.quotes[0][1];

var htmlPre = [
    {
        description: 'quotes inside html tags',
        input: '<p>"lorem ipsum"</p>',
        expected: '<p>' + doubleOpen + 'lorem ipsum' + doubleClose + '</p>'
    },
    {
        description: 'do not trim multiple spaces across html tags',
        input: 'lorem <em>foo</em> ipsum',
        expected: 'lorem <em>foo</em> ipsum'
    }
];

var options = [
    {
        description: 'default dash',
        input: 'lorem - ipsum',
        expected: 'lorem\u200a\u2014\u200aipsum'
    }
];

var modules = {
    htmlPre: {
        tests: htmlPre,
        options: { language: english, format: 'html' }
    },
    options: {
        tests: options,
        options: { language: english, options: { dash: 'em' } }
    }
};

unit({
    modules: modules,
    load: function (name) {
        return modules[name].tests;
    },
    init: function (name) {
        return modules[name].options;
    },
    test: function (test, transform) {
        return transform(test.input);
    }
});
