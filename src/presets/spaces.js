/// #### spaces
///
/// Even that they are not visible, spaces play important role in typography. Only one word space should be used at a
/// time. Also, in some cases, there should be non-breaking space instead of normal one (for example after some special
/// symbols).

export default function () {
    return [
        // multiple spaces
        [/ {2,}/g, ' '],
        // special symbols: (paragraph, section, copyright, trademark, registered trademark)
        [/(\u00B6|\u00A7|\u00A9|\u2122|\u00AE) /g, '$1\u00A0']
    ];
}

export function tests() {
    return [
        {
            description: 'trim multiple spaces into single one',
            input: 'lorem  ipsum dolor',
            expected: 'lorem ipsum dolor'
        },
        {
            description: 'non-breaking space after paragraph symbol',
            input: '\u00B6 ',
            expected: '\u00B6\u00A0'
        },
        {
            description: 'non-breaking space after section symbol',
            input: '\u00A7 ',
            expected: '\u00A7\u00A0'
        },
        {
            description: 'non-breaking space after copyright symbol',
            input: '\u00A9 ',
            expected: '\u00A9\u00A0'
        },
        {
            description: 'non-breaking space after trademark symbol',
            input: '\u2122 ',
            expected: '\u2122\u00A0'
        },
        {
            description: 'non-breaking space after registered trademark symbol',
            input: '\u00AE ',
            expected: '\u00AE\u00A0'
        }
    ];
}
