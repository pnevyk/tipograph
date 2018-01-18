/// #### hyphens
///
/// Hyphens are present on our keyboards and are used mostly to separatare multipart words ("cost-effective") or
/// multiword phrases which need to be together ("high-school grades"). Dashes come in two sizes: en dash and em dash.
/// En dash is used instead of hyphen in number ranges ("1-5"), or if two consecutive hyphens are found. Em dashed is
/// used as a break in sentence ("tipograph - even if it's just a set of simple rules - can improve typography in your
/// content"), or if three consecutive hyphens are found.
///
/// *Type of dash used as break in sentence might be dependent on language habits in the future.*

export default function () {
    // NOTE: consecutive hyphens (2 or 3) are always transformed, because it's a user's choice, even if it is bad in the
    //       context
    return [
        // em dash
        [/\u0020*---(\r?\n|$)/g, '\u200a\u2014$1'],
        [/\u0020*---\u0020*/g, '\u200a\u2014\u200a'],
        [/\u0020+-\u0020+/g, '\u200a\u2014\u200a'],
        // en dash
        [/--/g, '\u2013'],
        // number range
        [/(\d)-(\d)/g, '$1\u2013$2'],
    ];
}

export function tests() {
    return [
        {
            description: 'two consecutive hyphens surrounded by whitespaces into en dash',
            input: 'lorem -- ipsum',
            expected: 'lorem \u2013 ipsum'
        },
        {
            description: 'keep two consecutive hyphens if not surrounded by whitespaces',
            input: 'lorem--ipsum --dolor',
            expected: 'lorem\u2013ipsum \u2013dolor'
        },
        {
            description: 'three consecutive hyphens into em dash',
            input: 'lorem --- ipsum---dolor',
            expected: 'lorem\u200a\u2014\u200aipsum\u200a\u2014\u200adolor'
        },
        {
            description: 'three consecutive hyphens at the end of line or input into em dash',
            input: 'lorem ipsum---\nlorem ipsum---',
            expected: 'lorem ipsum\u200a\u2014\nlorem ipsum\u200a\u2014'
        },
        {
            description: 'hyphen surrounded by whitespaces into em dash',
            input: 'lorem - ipsum',
            expected: 'lorem\u200a\u2014\u200aipsum'
        },
        {
            description: 'keep hyphen if not surrounded by whitespaces',
            input: 'lorem-ipsum -dolor',
            expected: 'lorem-ipsum -dolor'
        },
        {
            description: 'hyphen surrounded by numbers into en dash',
            input: '1-5',
            expected: '1\u20135'
        },
        {
            description: 'take only word spaces as possible whitespaces in hypen to dash rule',
            input: 'lorem -\nipsum lorem\n- ipsum',
            expected: 'lorem -\nipsum lorem\n- ipsum'
        }
    ];
}
