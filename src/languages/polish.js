/// #### polish

import * as quotes from '../quotes';

export default {
    quotes: [[quotes.DOUBLE_OPEN_DOWN, quotes.DOUBLE_CLOSE_UP], [quotes.DOUBLE_LEFT, quotes.DOUBLE_RIGHT]],
    dash: 'en',
    rules: []
};

export function tests() {
    return [];
}
