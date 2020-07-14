/// #### czech
///
/// After some one-letter prepositions and conjuctions there should be a non-breaking space.

import * as quotes from '../quotes';

export default {
    quotes: [[quotes.DOUBLE_OPEN_DOWN, quotes.DOUBLE_OPEN_UP], [quotes.SINGLE_OPEN_DOWN, quotes.SINGLE_OPEN_UP]],
    dash: 'en',
    rules: [
        // non-breaking space after one-letter prepositions and conjuctions
        [/(\s|^)([KkSsVvZzOoUuAI])(?:\s+)(\S)/g, '$1$2\u00A0$3']
    ]
};

export function tests() {
    return [
        {
            description: 'non-breaking space after one-letter prepositions and conjuctions',
            input: 'V pořádku, k naší spokojenosti',
            expected: 'V\u00A0pořádku, k\u00A0naší spokojenosti'
        },
        {
            description: 'distinguish prepositions from just word-ending letter',
            input: 'Nalijme si čistého vína',
            expected: 'Nalijme si čistého vína',
        }
    ];
}
