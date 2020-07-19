var benchmarks = require('./benchmarks');
var tipograph = require('../src/tipograph').default;
var english = require('../src/languages/english').default;
var unit = require('./unit');

var doubleOpen = english.quotes[0][0];
var doubleClose = english.quotes[0][1];

var large = tipograph({ format: 'html' })(benchmarks.find(item => item.name === 'RegExp Reference').content);

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
    },
    {
        description: 'tipograph should work on large, realistic html documents',
        input: large.replace('Sign in to enjoy', 'Sign in to enjoy --'),
        expected: large.replace('Sign in to enjoy', 'Sign in to enjoy \u2013')
    },
    {
        description: 'support html entities in the rules',
        input: '&quot;HashMap&quot; with <code>K</code> -&gt; <code>V</code> structure',
        expected: doubleOpen + 'HashMap' + doubleClose + ' with <code>K</code> \u2192 <code>V</code> structure',
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
