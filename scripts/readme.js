var fs = require('fs');
var path = require('path');

var tipograph = require('../index');

// run generator
pipeline();

function pipeline() {
    var content = fs.readFileSync(path.join(__dirname, '..', '.readme.md')).toString();
    content = insertSections(content);

    var typo = tipograph({ format: dummyMarkdown });

    content = typo(content);

    fs.writeFileSync(path.join(__dirname, '..', 'README.md'), content);
}

function readSectionDescription(section, transform) {
    if (typeof transform === 'undefined') {
        transform = function (input) {
            return input;
        };
    }

    var directory = path.join(__dirname, '..', 'src', section);

    return fs.readdirSync(directory).filter(function (filename) {
        return filename !== 'index.js' && filename !== 'readme.md';
    }).map(function (filename) {
        return fs.readFileSync(path.join(directory, filename)).toString();
    }).map(function (source) {
        var docsPattern = /\/\/\/(.*)/g;
        var result = null;
        var output = '';

        while ((result = docsPattern.exec(source)) !== null) {
            output += result[1].trim() + '\n';
        }

        return transform(output);
    }).join('\n');
}

function insertSections(content) {
    function pattern(name) {
        return new RegExp('<!--\\s*\\{\\{\\s*' + name + '\\s*\\}\\}\\s*-->');
    }

    var presets = readSectionDescription('presets');
    var formats = readSectionDescription('formats');
    var languages = readSectionDescription('languages', function (description) {
        var pattern = /####\s(.+)/;
        var result = pattern.exec(description);
        var language = result[1];
        var typo = tipograph({ language: language });
        var quotes = typo('*quotes: "primary" | \'secondary\'*');
        var index = description.indexOf(result[0]) + result[0].length;
        return description.slice(0, index) + '\n\n' + quotes + description.slice(index);
    });
    var post = readSectionDescription('post');

    content = content.replace(pattern('presets'), presets);
    content = content.replace(pattern('formats'), formats);
    content = content.replace(pattern('languages'), languages);
    content = content.replace(pattern('post'), post);

    return content;
}

// this format preprocessor is far from being full markdown, it is built to be usable for tipograph readme
// in the future, this may grow into full markdown support
function dummyMarkdown() {
    var codeBlock = /^```/;
    var quoteBlock = /^>/;
    var listBlock = /^\* /;

    var commentInline = '<!--.*-->';
    var codeInline = '`.+`';

    function split(content) {
        var pattern = new RegExp([commentInline, codeInline].join('|'), 'g');
        var result = null;
        var last = 0;
        var output = [];

        while ((result = pattern.exec(content)) !== null) {
            output.push({ transform: true, content: content.slice(last, result.index)});
            output.push({ transform: false, content: result[0]});
            last = pattern.lastIndex;
        }

        output.push({ transform: true, content: content.slice(last)});

        return output;
    }

    return function (input) {
        var output = [];
        var lines = input.split('\n');

        for (var l = 0; l < lines.length; l++) {
            var line = lines[l];
            var e;
            var content;

            if (codeBlock.test(line)) {
                e = l + 1;
                while (!codeBlock.test(lines[e])) {
                    e++;
                }

                output.push({ transform: false, content: lines.slice(l, e + 1).join('\n') + '\n\n' });
                l = e;
            } else if (quoteBlock.test(line)) {
                e = l + 1;
                while (quoteBlock.test(lines[e])) {
                    e++;
                }

                content = [line].concat(lines.slice(l + 1, e).map(function (nextLine) {
                    return nextLine.slice(2);
                })).join(' ') + '\n\n';

                output = output.concat(split(content));
                l = e - 1;
            } else if (listBlock.test(line)) {
                e = l + 1;
                while (lines[e] !== '') {
                    if (!listBlock.test(lines[e])) {
                        lines[e - 1] += ' ' + lines[e];
                        lines[e] = '';
                    }
                    e++;
                }

                content = lines.slice(l, e).filter(function (line) {
                    return line !== '';
                }).join('\n') + '\n';

                output = output.concat(split(content));
                l = e - 1;
            } else if (line !== '') {
                e = l + 1;
                while (lines[e] !== '') {
                    e++;
                }

                content = lines.slice(l, e).join(' ') + '\n\n';

                output = output.concat(split(content));
                l = e - 1;
            }
        }

        return output;
    };
}

if (typeof process.env.TEST_FORMAT !== 'undefined') {
    dummyMarkdownTest();
}

function dummyMarkdownTest() {
    var typo = tipograph({ format: dummyMarkdown });

    var input = [
        '# Heading', '', '> "quote"', '> 2nd line', '', '```js', '// code', '```', '', '<!-- "comment" -->', '',
        '` "code" `', '', '"paragraph"', '2nd line', '', '* list', '* 2nd item', 'continuing on 3rd line',
        '* last item', ''
    ].join('\n');

    var expected = [
        '# Heading', '', '> “quote” 2nd line', '', '```js', '// code', '```', '', '<!-- "comment" -->', '',
        '` "code" `', '', '“paragraph” 2nd line', '', '* list', '* 2nd item continuing on 3rd line', '* last item', ''
    ].join('\n');

    var output = typo(input);

    if (output !== expected) {
        process.stderr.write('README FORMAT TEST FAILED!!!\n');

        var row = 1;
        var column = 1;

        for (var i = 0; i < output.length < expected.length ? output.length : expected.length; i++) {
            if (output[i] === '\n') {
                row++;
                column = 1;
            }

            if (output[i] !== expected[i]) {
                process.stderr.write('row: ' + row + ' | column: ' + column + '\n');
                break;
            }

            column++;
        }

        process.stderr.write(output);
        process.exit(1);
    }
}
