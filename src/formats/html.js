export default function () {
    var tag = '</?[a-zA-Z0-9-]+[^>]*>';

    // match spaces around tags too, because if the text with spaces left was transformed,
    // these spaces would probably disappear (spaces preset) and this could change semantic meanining of HTML source
    var pre = '\\s?<pre(?:>|\\s[^>]*>)[\\s\\S]*</pre>\\s?';
    var code = '\\s?<code(?:>|\\s[^>]*>)[\\s\\S]*</code>\\s?';

    var style = '<style(?:>|\\s[^>]*>)[\\s\\S]*</style>';
    var script = '<script(?:>|\\s[^>]*>)[\\s\\S]*</script>';

    return function (input) {
        var pattern = new RegExp([pre, code, style, script, tag].join('|'), 'gi');
        var result = null;
        var last = 0;
        var output = [];

        while ((result = pattern.exec(input)) !== null) {
            output.push({ transform: true, content: input.slice(last, result.index)});
            output.push({ transform: false, content: result[0]});
            last = pattern.lastIndex;
        }

        output.push({ transform: true, content: input.slice(last)});

        return output;
    };
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
            expected: 'loremdolor'
        }, {
            description: 'code tag',
            input: 'lorem <code>ipsum</code> dolor',
            expected: 'loremdolor'
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
        }
    ];
}
