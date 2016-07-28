/**
 * @module Languages
 * @author Petr Nevyhoštěný
 * @version 0.1.0
 * @license https://github.com/nevyk/tipograph/blob/master/LICENSE MIT License
 * @description This module provides just predefined quotes format for some languages
 */

(function () {
    var defineQuotesFormat = function (format) {
        return {
            quotesFormat : format
        };
    };

    var languages = {
        //this is for traditional chinese
        //simplified chinese use the same format as english language
        chinese : defineQuotesFormat(
            'double-top-corner double-bottom-corner single-top-corner single-bottom-corner'
        ),
        czech : defineQuotesFormat(
            'double-open-down double-open-up single-open-down single-open-up'
        ),
        danish : defineQuotesFormat(
            'double-right double-left double-open-down double-open-up'
        ),
        english : defineQuotesFormat(
            'double-open-up double-close-up single-open-up single-close-up'
        ),
        finnish : defineQuotesFormat(
            'double-close-up double-close-up single-close-up single-close-up'
        ),
        french : defineQuotesFormat(
            'double-left-space double-space-right double-open-up double-close-up'
        ),
        german : defineQuotesFormat(
            'double-open-down double-open-up single-open-down single-open-up'
        ),
        italian : defineQuotesFormat(
            'double-left double-right double-open-up double-close-up'
        ),
        japanese : defineQuotesFormat(
            'double-top-corner double-bottom-corner single-top-corner single-bottom-corner'
        ),
        norwegian : defineQuotesFormat(
            'double-left double-right single-close-up single-close-up'
        ),
        polish : defineQuotesFormat(
            'double-open-down double-close-up double-left double-right'
        ),
        portuguese : defineQuotesFormat(
            'double-open-up double-close-up single-open-up single-close-up'
        ),
        russian : defineQuotesFormat(
            'double-left double-right double-open-down double-open-up'
        ),
        spanish : defineQuotesFormat(
            'double-left double-right double-open-up double-close-up'
        ),
        swedish : defineQuotesFormat(
            'double-close-up double-close-up single-close-up single-close-up'
        ),
        swiss : defineQuotesFormat(
            'double-left double-right single-left single-right'
        )
    };

    if (typeof module === 'object' && module.exports) {
        module.exports = languages;
    }
    
    else if (typeof window !== 'undefined') {
        var Tipograph = window.Tipograph || {};
        Tipograph.Languages = languages;
        window.Tipograph = Tipograph;
    }
    
})();
