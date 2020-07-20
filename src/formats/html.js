/// #### html
///
/// HTML tags are kept as they are. Moreover, it also preserves whole contents of the following tags: pre, code, style,
/// script.

export default function () {
    return function (input) {
        var result = null;
        var last = 0;
        var output = [];

        while ((result = findTag(input, last)) !== null) {
            output.push({ transform: true, content: input.slice(last, result[0]) });
            output.push({ transform: false, content: input.slice(result[0], result[1]) });
            last = result[1];
        }

        output.push({ transform: true, content: input.slice(last) });

        return output;
    };
}

function findTag(input, last) {
    // global flag needed for setting `lastIndex` property when doing `exec`
    var pattern = /<[/!]?[a-z][a-z0-9-_]*|<!--/gi;
    pattern.lastIndex = last;

    var tagEnd;
    var result = null;
    if ((result = pattern.exec(input)) !== null) {
        var tag = result[0].toLowerCase();
        var start = result.index;
        if (tag === '<!--') {
            var commentEnd = findCommentEnd(input, pattern.lastIndex);
            return [start, commentEnd];
        } else if (['<pre', '<code', '<style', '<script'].indexOf(tag) != -1) {
            var closeTag = new RegExp(tag[0] + '/' + tag.slice(1), 'gi');
            closeTag.lastIndex = pattern.lastIndex;
            if ((result = closeTag.exec(input)) !== null) {
                tagEnd = findTagEnd(input, closeTag.lastIndex);
                return [start, tagEnd];
            } else {
                // not closed special tag
                return [start, input.length];
            }
        } else {
            tagEnd = findTagEnd(input, pattern.lastIndex);
            return [start, tagEnd];
        }
    } else {
        return null;
    }
}

function findTagEnd(input, last) {
    var state = 'initial';
    var escape = false;

    for (var i = last; i < input.length; i++) {
        if (state === 'initial') {
            if (input[i] === '>') {
                return i + 1;
            } else if (input[i] === '"') {
                state = 'double';
            } else if (input[i] === '\'') {
                state = 'single';
            }
        } else if (state === 'double') {
            if (input[i] === '"' && !escape) {
                state = 'initial';
            } else if (input[i] === '\\') {
                escape = true;
            } else {
                escape = false;
            }
        } else if (state === 'single') {
            if (input[i] === '\'' && !escape) {
                state = 'initial';
            } else if (input[i] === '\\') {
                escape = true;
            } else {
                escape = false;
            }
        }
    }

    return input.length;
}

function findCommentEnd(input, last) {
    var pattern = /-->/g;
    pattern.lastIndex = last;

    var result = null;
    if ((result = pattern.exec(input)) !== null) {
        return result.index + 3;
    } else {
        return input.length;
    }
}

export function tests() {
    return [
        {
            description: 'pair tags',
            input: 'lorem <b>ipsum</b> dolor',
            expected: 'lorem ipsum dolor'
        },
        {
            description: 'single tag',
            input: 'lorem <br />ipsum<br> dolor',
            expected: 'lorem ipsum dolor'
        }, {
            description: 'pre tag',
            input: 'lorem <pre>ipsum</pre> dolor',
            expected: 'lorem  dolor'
        }, {
            description: 'code tag',
            input: 'lorem <code>ipsum</code> dolor',
            expected: 'lorem  dolor'
        }, {
            description: 'custom tag starting with pre',
            input: 'lorem <precision>ipsum</precision> dolor',
            expected: 'lorem ipsum dolor'
        }, {
            description: 'custom tag starting with code',
            input: 'lorem <codec>ipsum</codec> dolor',
            expected: 'lorem ipsum dolor'
        }, {
            description: 'style tag',
            input: '<style>\nhtml { height: 100%; }\n</style>',
            expected: ''
        }, {
            description: 'script tag',
            input: '<script>\nconsole.log("Hello world!")\n</script>',
            expected: ''
        }, {
            description: 'multiple scripts',
            input: '<script>lorem</script> ipsum <script>dolor</script>',
            expected: ' ipsum '
        }, {
            description: 'complex attributes',
            input: '<i class="is this > even\\" legit?">lorem</i>',
            expected: 'lorem'
        }, {
            description: 'html comments',
            input: 'lorem <!-- comment --> ipsum',
            expected: 'lorem  ipsum',
        }, {
            description: 'doctype',
            input: '<!DOCTYPE html>',
            expected: '',
        }
    ];
}
