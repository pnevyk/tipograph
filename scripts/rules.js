var fs = require('fs');
var path = require('path');

var english = require('../src/languages/english').default;

var output = builder();

for (var preset in require('../src/presets')) {
    var tests = require('../src/presets/' + preset).tests;

    if (typeof tests !== 'undefined') {
        var rules = tests(english);

        output.preset(preset);

        for (var i = 0; i < rules.length; i++) {
            output.rule(rules[i]);
        }
    }
}

fs.writeFileSync(path.join(__dirname, '..', 'rules.md'), output.toString());

function builder() {
    var presets = [];

    return {
        preset: function (name) {
            presets.push({
                name: name,
                rules: []
            });

            return this;
        },
        rule: function (rule) {
            if (presets.length > 0) {
                presets[presets.length - 1].rules.push(rule);
            }

            return this;
        },
        toString: function () {
            var output = '';

            output += '## Notes\n\n';
            output += '* All transformations are shown for english. It might differ for other languages.\n';
            output += '* Non-breaking space is represented as \u237D character.\n';
            output += '\n';

            for (var p = 0; p < presets.length; p++) {
                if (presets[p].rules.length > 0) {
                    output += '# ' + presets[p].name + '\n\n';

                    output += '<table>\n';
                    output += '<thead><tr><th>Description</th><th>Input</th><th>Output</th></tr></thead>\n';
                    output += '<tbody>\n';

                    for (var r = 0; r < presets[p].rules.length; r++) {
                        var rule = presets[p].rules[r];

                        output += '<tr>';
                        output += '<td>' + rule.description + '</td>';
                        output += '<td>' + whitespace(rule.input) + '</td>';
                        output += '<td>' + whitespace(rule.expected) + '</td>';
                        output += '</tr>\n';
                    }

                    output += '</tbody>\n';
                    output += '</table>\n\n';
                }
            }

            return output;
        }
    };
}

function whitespace(content) {
    return content
        .replace(/\n/g, '<br />')
        .replace(/\u00A0/g, '<span style="font-size: 75%; opacity: 0.5">\u237D</span>');
}
