/// #### quotes
///
/// Nice quotes are probably the most visible feature of correct typography. On our keyboards, we have just these
/// straight one which are pretty ugly. However, *tipograph* tries to replace them with their correct counterparts - and
/// it even takes language habits into account. Moreover, it attempts to handle apostrophes, inch and foot units
/// symbols, or fix some writers' bad habbits (such as two consecutive commas in order to imitate bottom 99-shaped
/// quotes).

export default function (language) {
    var doubleOpen = language.quotes[0][0];
    var doubleClose = language.quotes[0][1];
    var singleOpen = language.quotes[1][0];
    var singleClose = language.quotes[1][1];

    return [
        // two commas into double open down
        [/(\s|\(|^),,([^"']+)(\S)(?:"|'')/g, '$1\u201E$2$3' + doubleClose],
        // one comma into single open down in certain cases
        [/(\s|\(|^),(?!\s)([^']+)(\S)'/g, '$1\u201A$2$3' + singleClose],
        // apostrophe
        [/([a-z])'([a-z])/gi, '$1\u2019$2'],
        // decades
        [/(\s)'(\d{2})/g, '$1\u2019$2'],
        // double curly quotes
        [/(\s|\(|^)"(?!\s)([^"]+)(\S)"/g, '$1' + doubleOpen + '$2$3' + doubleClose],
        // single curly quotes
        [/(\s|\(|^)'(?!\s)([^']+)(\S)'/g, '$1' + singleOpen + '$2$3' + singleClose],
        // inches
        [/(\d)"/g, '$1\u2033'],
        // feet
        [/(\d)'/g, '$1\u2032']
    ];
}

export function tests(language) {
    var doubleOpen = language.quotes[0][0];
    var doubleClose = language.quotes[0][1];
    var singleOpen = language.quotes[1][0];
    var singleClose = language.quotes[1][1];

    return [
        {
            description: 'double straight quotes into curly quotes',
            input: '"lorem ipsum"',
            expected: doubleOpen + 'lorem ipsum' + doubleClose
        },
        {
            description: 'double straight quotes inside parentheses into curly quotes',
            input: '("lorem ipsum")',
            expected: '(' + doubleOpen + 'lorem ipsum' + doubleClose + ')'
        },
        {
            description: 'keep double straight quotes if they are not in a pair',
            input: '"lorem ipsum',
            expected: '"lorem ipsum'
        },
        {
            description: 'keep double straight quotes if they do not represent actual quotes',
            input: '" lorem ipsum"',
            expected: '" lorem ipsum"',
        },
        {
            description: 'keep double straight quotes if they are not in a pair',
            input: '"lorem ipsum',
            expected: '"lorem ipsum'
        },
        {
            description: 'multiple double straight quotes into curly quotes',
            input: '"lorem" "ipsum"',
            expected: doubleOpen + 'lorem' + doubleClose + ' ' + doubleOpen + 'ipsum' + doubleClose
        },
        {
            description: 'single straight quotes into curly quotes',
            input: '\'lorem ipsum\'',
            expected: singleOpen + 'lorem ipsum' + language.quotes[1][1]
        },
        {
            description: 'single straight quotes inside parentheses into curly quotes',
            input: '(\'lorem ipsum\')',
            expected: '(' + singleOpen + 'lorem ipsum' + singleClose + ')'
        },
        {
            description: 'keep single straight quotes if they are not in a pair',
            input: '\'lorem ipsum',
            expected: '\'lorem ipsum'
        },
        {
            description: 'keep single straight quotes if they are not in a pair',
            input: '\'lorem\' ipsum\'',
            expected: singleOpen + 'lorem' + language.quotes[1][1] + ' ipsum\''
        },
        {
            description: 'keep single straight quotes if they do not represent actual quotes',
            input: '\' lorem ipsum\'',
            expected: '\' lorem ipsum\'',
        },
        {
            description: 'multiple single straight quotes into curly quotes',
            input: '\'lorem\' \'ipsum\'',
            expected: singleOpen + 'lorem' + singleClose + ' ' + singleOpen + 'ipsum' + singleClose
        },
        {
            description: 'two consecutive commas into double double open down quote if a matching quote is found',
            input: ',,lorem" ,,ipsum\'\'',
            expected: '\u201Elorem' + doubleClose + ' ' + '\u201Eipsum' + doubleClose
        },
        {
            description: 'keep two consecutive commas if no matching quote is found',
            input: 'lorem ,,ipsum',
            expected: 'lorem ,,ipsum'
        },
        {
            description: 'comma into single open down quote in certain cases if a matching quote is found',
            input: 'lorem ,ipsum\'',
            expected: 'lorem \u201Aipsum' + singleClose
        },
        {
            description: 'keep comma if it is probably comma',
            input: 'lorem, ipsum\' lorem,ipsum\' ,lorem',
            expected: 'lorem, ipsum\' lorem,ipsum\' ,lorem'
        },
        {
            description: 'double straight quote after number into double prime (inch symbol)',
            input: '123"',
            expected: '123\u2033'
        },
        {
            description: 'single straight quote after number into single prime (foot symbol)',
            input: '123\'',
            expected: '123\u2032'
        },
        {
            description: 'single straight quote between two letters into apostrophe',
            input: 'it\'s',
            expected: 'it\u2019s'
        },
        {
            description: 'single straight quote between two letters into apostrophe inside of single curly quotes',
            input: '\'it\'s\'',
            expected: singleOpen + 'it\u2019s' + singleClose
        },
        {
            description: 'mixed single and double straight quotes also with apostrophes in various contexts',
            /* eslint-disable max-len */
            input: 'I wasn\'t a particular fan of the music in the \'80s. And then she blurted, "I thought you said, \'I don\'t like \'80s music\'?"',
            expected: 'I wasn\u2019t a particular fan of the music in the \u201980s. And then she blurted, \u201CI thought you said, \u2018I don\u2019t like \u201980s music\u2019?\u201D'
            /* eslint-enable max-len */
        }
    ];
}
