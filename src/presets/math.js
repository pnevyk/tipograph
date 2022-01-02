/// #### math
///
/// Unfortunately, majority of nice mathematical symbols is not present on our keyboard. Where it make sense,
/// *tipograph* tries to put them instead of their poor substitues. For example, minus sign (that's right, even minus
/// sign has its special character) instead of hyphen, multiplication sign instead of the letter "x", etc. Imagine how
/// you would write this formula just by hand: 2 * 3 != 5.

export default function () {
    return [
        // subtraction
        [/(\d\s)-(\s\d)/g, '$1\u2212$2'],
        // plusminus
        [/\+-/g, '\u00B1'],
        // negative
        [/-(\d)/g, '\u2212$1'],
        // multiplication
        [/(\d\s)[x*](\s\d)/g, '$1\u00D7$2'],
        // division
        [/(\d\s)\/(\s\d)/g, '$1\u00F7$2'],
        // inequality
        [/!=/g, '\u2260'],
        // less than or equal to
        [/<=/g, '\u2264'],
        // greater than or equal to
        [/>=/g, '\u2265'],
    ];
}

export function tests() {
    return [
        {
            description: 'minus sign between numbers',
            input: '3 - 2',
            expected: '3 \u2212 2'
        },
        {
            description: 'minus sign right before number',
            input: '-1',
            expected: '\u22121'
        },
        {
            description: 'multiplication sign between numbers',
            input: '2 x 3 2x3 2 * 3 2*3',
            expected: '2 \u00D7 3 2x3 2 \u00D7 3 2*3'
        },
        {
            description: 'division sign between numbers',
            input: '2 / 3 2/3',
            expected: '2 \u00F7 3 2/3'
        },
        {
            description: 'plusminus sign',
            input: '+- + -',
            expected: '\u00B1 + -'
        },
        {
            description: 'inequality sign',
            input: '!= ! =',
            expected: '\u2260 ! ='
        },
        {
            description: 'plusminus sign before number',
            input: '+-3',
            expected: '\u00B13'
        },
        {
            description: 'less than or equal to sign',
            input: '<= < = =<',
            expected: '\u2264 < = =<'
        },
        {
            description: 'greater than or equal to sign',
            input: '>= > = =>',
            expected: '\u2265 > = =>'
        },
    ];
}
