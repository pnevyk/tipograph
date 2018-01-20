/// #### symbols
///
/// There are a lot of special symbols which we don't know how to write and that makes us sad. Instead, we tend to use
/// some substitues for them. And *tipograph* replaces these substitues with their actual characters, for example
/// copyright or trademark symbols. It also changes "??", "?!" and "!?" into ligature counterparts. Also, multiple
/// question marks (more than two) or exclamation points (more than one) are squashed.

export default function () {
    return [
        // copyright (\s before (?:c|C) not to match e.g. "12(c)")
        [/(\s|^)\((?:c|C)\)\s?/g, '$1\u00A9\u00A0'],
        // trademark
        [/\((?:tm|TM)\)\s?/g, '\u2122\u00A0'],
        // registered trademark
        [/\((?:r|R)\)\s?/g, '\u00AE\u00A0'],
        // ellipsis
        [/([^.]|^)\.\.\.([^.]|$)/g, '$1\u2026$2'],
        // arrows
        [/<-/g, '\u2190'],
        [/->/g, '\u2192'],
        // question/exclamation marks
        [/\?!+/g, '\u2048'],
        [/!\?+/g, '\u2049'],
        [/\?{2,}/g, '\u2047'],
        [/!{2,}/g, '!'],
    ];
}

export function tests() {
    return [
        {
            description: 'copyright',
            input: '(c)  (c)  (C)  2(c)  2(C)  (c)',
            expected: '\u00A9\u00A0 \u00A9\u00A0 \u00A9\u00A0 2(c)  2(C)  \u00A9\u00A0'
        },
        {
            description: 'trademark',
            input: '(tm)(tm) (TM)(TM) ',
            expected: '\u2122\u00A0\u2122\u00A0\u2122\u00A0\u2122\u00A0'
        },
        {
            description: 'registered trademark',
            input: '(r)(r) (R)(R) ',
            expected: '\u00AE\u00A0\u00AE\u00A0\u00AE\u00A0\u00AE\u00A0'
        },
        {
            description: 'ellipsis',
            input: '... a...z .... ......',
            expected: '\u2026 a\u2026z .... ......'
        },
        {
            description: 'arrows',
            input: '<- ->',
            expected: '\u2190 \u2192'
        },
        {
            description: 'double question mark',
            input: '??',
            expected: '\u2047'
        },
        {
            description: 'question exclamation mark',
            input: '?!',
            expected: '\u2048'
        },
        {
            description: 'exclamation question mark',
            input: '!?',
            expected: '\u2049'
        },
        {
            description: 'multiple question marks',
            input: '??? ????',
            expected: '\u2047 \u2047'
        },
        {
            description: 'multiple exclamation marks',
            input: '!! !!!!',
            expected: '! !'
        },
        {
            description: 'question exclamation mark with multiple exclamation marks',
            input: '?!! ?!!!',
            expected: '\u2048 \u2048'
        },
        {
            description: 'exclamation question mark with multiple question marks',
            input: '!?? !???',
            expected: '\u2049 \u2049'
        }
    ];
}
