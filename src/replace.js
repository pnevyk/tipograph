(function () {
    var config = {
        //see parseQuotesFormat for possible values
        quotesFormat : 'double-open-up double-close-up single-open-up single-close-up'
    };

    //reference of the first object
    //is extended with the second object,
    //there is no need to return value
    var extend = function (a, b) {
        for (var prop in b) {
            if (b.hasOwnProperty(prop)) {
                a[prop] = b[prop];
            }
        }

        return a;
    };

    var parseQuotesFormat = function (format) {
        var possibilities = {
            'double-open-up' : '\u201C',
            'single-open-up' : '\u2018',
            'double-close-up' : '\u201D',
            'single-close-up' : '\u2019',
            'double-open-down' : '\u201E',
            'single-open-down' : '\u201A',
            'double-left' : '\u00AB',
            'single-left' : '\u2039',
            'double-right' : '\u00BB',
            'single-right' : '\u203A',
            'double-left-space' : '\u00AB\u00A0',
            'single-left-space' : '\u2039\u00A0',
            'double-space-right' : '\u00A0\u00BB',
            'single-space-right' : '\u00A0\u203A',
            'double-top-corner' : '\u300C',
            'single-top-corner' : '\u300E',
            'double-bottom-corner' : '\u300D',
            'single-bottom-corner' : '\u300F'
        };

        var splited = format.split(' ');

        splited[0] = possibilities[splited[0]] || possibilities['double-open-up'];
        splited[1] = possibilities[splited[1]] || possibilities['double-close-up'];
        splited[2] = possibilities[splited[2]] || possibilities['single-open-up'];
        splited[3] = possibilities[splited[3]] || possibilities['single-close-up'];

        var doubleQuotes = splited[0] + '$1' + splited[1];
        var singleQuotes = splited[2] + '$1' + splited[3];

        return [doubleQuotes, singleQuotes];
    };

    var Replace = function (defaults) {
        this.config = defaults;
    };

    Replace.prototype.configure = function (options) {
        extend(this.config, options);
    };

    Replace.prototype.all = function (input) {
        input = this.spaces(input);
        input = this.quotes(input);
        input = this.hyphensAndDashes(input);
        input = this.symbols(input);

        return input;
    };

    Replace.prototype.quotes = function (input) {
        var singlePattern = /'([^']*)'/g,
            doublePattern = /"([^"]*)"/g,
            inchPattern = /(\d)"/g,
            footPattern = /(\d)'/g,
            apostrophePattern = /(\w)'(\w)/g;

        var quotes = parseQuotesFormat(this.config.quotesFormat);

        return input.replace(apostrophePattern, '$1\u2019$2') //apostrophe
                    .replace(inchPattern, '$1\u2033') //double prime
                    .replace(footPattern, '$1\u2032') //prime
                    //see parseQuotesFormat() to check unicode characters
                    .replace(doublePattern, quotes[0])
                    .replace(singlePattern, quotes[1])
                    //replace the rest of straight single quotes by apostrophes
                    .replace(/'/g, 'u2019');
    };

    Replace.prototype.spaces = function (input) {
        var manySpacesPattern = /\u0020{2,}/g,
            //paragraph, section sign, copyright,
            //trademark, registered trademark
            symbolsPattern = /(\u00B6|\u00A7|\u00A9|\u2122|\u00AE)\u0020/g;

        return input.replace(manySpacesPattern, '\u0020')
                    //non-breaking space after sign
                    .replace(symbolsPattern, '$1\u00A0');
    };

    Replace.prototype.hyphensAndDashes = function (input) {
        var //en dash (some people type -- instead of en dash)
            enDashPattern = /\-\-/g,
            //em dash (some people type --- instead of en dash)
            emDashPattern = /\-\-\-/g,
            sentenceBreakPattern = /\s\-\s/g,
            //range between numbers
            numberRangePattern = /(\d)\-(\d)/g,
            //range between letters
            //(we mustn't match lowercase letters
            //because we don't know if it is range or not)
            //NOTE: consider if this may be used
            //it could lead to wrong replacements
            letterRangePattern = /([A-Z])\-([A-Z])/g,
            //NOTE: consider if these may be used
            //they could lead to wrong replacements
            subtractionPattern = /(\d\s)\-(\s\d)/g,
            minusPattern = /\-(\d)/g;

        //NOTE: consider to use non breaking hyphens
        //as replacement for user typed normal hyphens
        //(e.g. in UTF-8 both UTF and 8 should be on the same line)

        return input.replace(emDashPattern, '\u2014')
                    .replace(enDashPattern, '\u2013')
                    //consider use of em dash without spaces
                    //this may be configuration option
                    .replace(sentenceBreakPattern, ' \u2013 ')
                    .replace(subtractionPattern, '$1\u2212$2')
                    .replace(minusPattern, '\u2212$1')
                    .replace(numberRangePattern, '$1\u2013$2')
                    .replace(letterRangePattern, '$1\u2013$2');
    };

    Replace.prototype.symbols = function (input) {
        var //there is space before (c) not to match e.g. this 12(c)
            copyrightPattern = /(\s|^)\((C|c)\)\s?/g,
            trademarkPattern = /\((TM|tm)\)\s?/g,
            registeredPattern = /\((R|r)\)\s?/g,
            //a lot of people use "x" letter as symbol of multiplication
            multiplicationPattern = /(\d\s?)x(\s?\d)/g,
            //Spaces around slash are important
            //because e.g. 34/2 might not be division
            //NOTE: consider if this may be used
            //it could lead to wrong replacements
            divisionPattern = /(\d\s)\/(\s\d)/g,
            ellipsisPattern = /\.\.\./g;

        return input.replace(copyrightPattern, '$1\u00A9\u00A0')
                    .replace(trademarkPattern, '\u2122\u00A0')
                    .replace(registeredPattern, '\u00AE\u00A0')
                    //NOTE: shouldn't be there non breaking spaces?
                    .replace(multiplicationPattern, '$1\u00D7$2')
                    .replace(divisionPattern, '$1\u00F7$2')
                    .replace(ellipsisPattern, '\u2026');
    };

    if (typeof window !== 'undefined') {
        var Tipograph = window.Tipograph || {};
        Tipograph.Replace = new Replace(config);
        window.Tipograph = Tipograph;
    }

    else {
        module.exports = new Replace(config);
    }
})();