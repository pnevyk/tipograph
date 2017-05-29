/**
 * @module Replace
 * @author Petr Nevyhoštěný
 * @version 0.3.5
 * @license https://github.com/nevyk/tipograph/blob/master/LICENSE MIT License
 * @description This module just provides predefined quotes format for some languages
 */

(function () {
    var config = {
        customRules : [],
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

    var HtmlEscaper = function () {
        this.escapes = [];
        this.counter = -1;
    };

    HtmlEscaper.prototype.escape = function (input) {
        //TODO: improve prePattern not to match e.g. <codec> (possible custom tag)
        var prePattern = /<(pre|code)[^>]*>[\S\s]*(?=<\/\1>)<\/\1>/gi,
            pairPattern = /(<(\S+)[^>]*>)([\S\s]*(?=<\/\2>))(<\/\2>)/g,
            singlePattern = /<[^>\d\s][^>]*>/g,
            self = this;

        //reset
        this.escapes = [];
        this.counter = -1;

        //escape all pre or code html tags also with their content
        //format: <pre>content</pre> => #@0&
        //escapes = [
        //    {
        //        pair : false,
        //        content : '<pre>content</pre>'
        //    }
        //]

        var singleEscaper = function (match) {
            self.counter++;

            self.escapes.push({
                pair : false,
                content : match
            });

            return '#@' + self.counter + '&';
        };

        while (prePattern.test(input)) {
            input = input.replace(prePattern, singleEscaper);
        }

        //escape pair html tags
        //format: <a href="path/to">content</a> => #^@0&content#$@0&
        //escapes = [
        //    {
        //        pair : true,
        //        opening : '<a href="path/to">',
        //        closing : '</a>'
        //    }
        //]

        var pairEscaper = function (match, openTag, tagName, content, closeTag) {
            self.counter++;

            self.escapes.push({
                pair : true,
                opening : openTag,
                closing : closeTag
            });

            return '#^@' + self.counter + '&' + content + '#$@' + self.counter + '&';
        };

        while (pairPattern.test(input)) {
            input = input.replace(pairPattern, pairEscaper);
        }

        //escape single html tags
        //format: <br> => #@0&
        //escapes = [
        //    {
        //        pair : false,
        //        content : '<br>'
        //    }
        //]

        while (singlePattern.test(input)) {
            input = input.replace(singlePattern, singleEscaper);
        }

        return input;
    };

    HtmlEscaper.prototype.unescape = function (output) {
        var pattern, item;

        for (var i = 0; i < this.escapes.length; i++) {
            item = this.escapes[i];

            if (item.pair) {
                pattern = new RegExp('#\\^@' + i + '&' + '([\\S\\s]*)' + '#\\$@' + i + '&', 'g');

                output = output.replace(pattern,
                    item.opening + '$1' + item.closing
                );
            }

            else {
                pattern = new RegExp('#@' + i + '&', 'g');
                output = output.replace(pattern, item.content);
            }
        }

        return output;
    };

    var Replace = function (defaults) {
        this.config = {};
        extend(this.config, defaults);
    };

    Replace.prototype.configure = function (options) {
        extend(this.config, options);
    };

    Replace.prototype.all = function (input) {
        var html = new HtmlEscaper();

        input = html.escape(input);

        input = this.spaces(input, false);
        input = this.quotes(input, false);
        input = this.mathSigns(input, false);
        input = this.hyphens(input, false);
        input = this.symbols(input, false);
        input = this.symbols(input, false);

        return html.unescape(input);
    };

    Replace.prototype.quotes = function (input, escapeHtml) {
        escapeHtml = typeof escapeHtml === 'undefined' ? true : escapeHtml;

        var singlePattern = /'([^']*)'/g,
            doublePattern = /"([^"]*)"/g,
            inchPattern = /(\d)"/g,
            footPattern = /(\d)'/g,
            apostrophePattern = /(\w)'(\w)/g,
            yearPattern = /(\s)'(\d{2})/g,
            //some people type two commas in order to make
            //quote look like double low-9 quotation mark
            twoCommasPattern = /\,\,/g,
            //some people type one comma in order to make
            //quote look like single low-9 quotation mark
            //NOTE: consider if this may be used
            //it could lead to wrong replacements
            oneCommaPattern = /(\s|^)\,([^'\s]*')/g,
            html;

        if (escapeHtml) {
            html = new HtmlEscaper();
            input = html.escape(input);
        }

        var quotes = parseQuotesFormat(this.config.quotesFormat);

        input = input.replace(twoCommasPattern, '\u0022')
                     .replace(oneCommaPattern, '$1\u0027$2')
                     .replace(apostrophePattern, '$1\u2019$2') //apostrophe
                     .replace(yearPattern, '$1\u2019$2') //apostrophe before year
                     .replace(inchPattern, '$1\u2033') //double prime
                     .replace(footPattern, '$1\u2032') //prime
                     //see parseQuotesFormat() to check unicode characters
                     .replace(doublePattern, quotes[0])
                     .replace(singlePattern, quotes[1])
                     //replace the rest of straight single quotes by apostrophes
                     .replace(/'/g, '\u2019');

        return escapeHtml ? html.unescape(input) : input;
    };

    Replace.prototype.spaces = function (input, escapeHtml) {
        escapeHtml = typeof escapeHtml === 'undefined' ? true : escapeHtml;

        var manySpacesPattern = /\u0020{2,}/g,
            //paragraph, section sign, copyright,
            //trademark, registered trademark
            symbolsPattern = /(\u00B6|\u00A7|\u00A9|\u2122|\u00AE)\u0020/g,
            html;

        if (escapeHtml) {
            html = new HtmlEscaper();
            input = html.escape(input);
        }

        input = input.replace(manySpacesPattern, '\u0020')
                     //non-breaking space after sign
                     .replace(symbolsPattern, '$1\u00A0');

        return escapeHtml ? html.unescape(input) : input;
    };

    Replace.prototype.hyphens = function (input, escapeHtml) {
        escapeHtml = typeof escapeHtml === 'undefined' ? true : escapeHtml;

        var //en dash (some people type -- instead of en dash)
            enDashPattern = /\-\-/g,
            //em dash (some people type --- instead of em dash)
            emDashPattern = /\-\-\-/g,
            sentenceBreakPattern = /\s\-\s/g,
            //range between numbers
            numberRangePattern = /(\d)\-(\d)/g,
            //range between letters
            //(we mustn't match lowercase letters
            //because we don't know if it is range or not)
            //NOTE: consider if this may be used
            //it could lead to wrong replacements
            //NOTE: consider if e.g. A-z or a-Z may be recognized as range
            letterRangePattern = /([A-Z])\-([A-Z])/g,
            html;

        //NOTE: consider to use non breaking hyphens
        //as replacement for user typed normal hyphens
        //(e.g. in UTF-8 both UTF and 8 should be on the same line)

        if (escapeHtml) {
            html = new HtmlEscaper();
            input = html.escape(input);
        }

        input = input.replace(emDashPattern, '\u2014')
                     .replace(enDashPattern, '\u2013')
                     .replace(numberRangePattern, '$1\u2013$2')
                     //consider use of em dash without spaces
                     //this may be configuration option
                     .replace(sentenceBreakPattern, '\u0020\u2013\u0020')
                     .replace(letterRangePattern, '$1\u2013$2');

        return escapeHtml ? html.unescape(input) : input;
    };

    Replace.prototype.mathSigns = function (input, escapeHtml) {
        escapeHtml = typeof escapeHtml === 'undefined' ? true : escapeHtml;

        var //NOTE: consider if these may be used
            //they could lead to wrong replacements
            subtractionPattern = /(\d\s)\-(\s\d)/g,
            minusPattern = /\-(\d)/g,
            //a lot of people use "x" letter as symbol of multiplication
            //spaces around "x" are important
            //because e.g. 2x3 might not be multiplication
            //but just unknow number between 2 and 3
            multiplicationPattern = /(\d\s)x(\s\d)/g,
            //spaces around slash are important
            //because e.g. 34/2 might not be division
            //NOTE: consider if this may be used
            //it could lead to wrong replacements
            divisionPattern = /(\d\s)\/(\s\d)/g,
            plusMinusPattern = /\+\-/g,
            inequalityPattern = /\!\=|<>/g,
            html;

        if (escapeHtml) {
            html = new HtmlEscaper();
            input = html.escape(input);
        }

        input = input//NOTE: minus character should look exactly like en dash
                     //consider to use en dash instead of minus
                     .replace(subtractionPattern, '$1\u2212$2')
                     .replace(minusPattern, '\u2212$1')
                     //NOTE: shouldn't be there non breaking spaces?
                     .replace(multiplicationPattern, '$1\u00D7$2')
                     .replace(divisionPattern, '$1\u00F7$2')
                     .replace(plusMinusPattern, '\u00B1')
                     .replace(inequalityPattern, '\u2260');

        return escapeHtml ? html.unescape(input) : input;
    };

    Replace.prototype.symbols = function (input, escapeHtml) {
        escapeHtml = typeof escapeHtml === 'undefined' ? true : escapeHtml;

        var //there is \s before (C|c) not to match e.g. this 12(c)
            copyrightPattern = /(\s|^)\((C|c)\)\s?/g,
            trademarkPattern = /\((TM|tm)\)\s?/g,
            registeredPattern = /\((R|r)\)\s?/g,
            //change three dots into ellipsis only
            //when it'not surrounded by other dots
            //because when user types a lot of dots
            //he might not want to replace it with ellipsis
            ellipsisPattern = /([^\.]|^)\.\.\.([^\.]|$)/g,
            html;

        if (escapeHtml) {
            html = new HtmlEscaper();
            input = html.escape(input);
        }

        input = input.replace(copyrightPattern, '$1\u00A9\u00A0')
                     .replace(trademarkPattern, '\u2122\u00A0')
                     .replace(registeredPattern, '\u00AE\u00A0')
                     .replace(ellipsisPattern, '$1\u2026$2');

        return escapeHtml ? html.unescape(input) : input;
    };

    Replace.prototype.addCustomRule = function (search, replacement) {
        if (typeof search !== 'string' && !(search instanceof RegExp)) throw 'regexp must be a string or a regular expression';
        if (typeof replacement !== 'string' && typeof replacement !== 'function') throw 'replacement must be a string or a function';

        this.config.customRules.push({
            search : search,
            replacement : replacement
        });
    };

    Replace.prototype.custom = function (input, escapeHtml) {
        escapeHtml = typeof escapeHtml === 'undefined' ? true : escapeHtml;

        if (escapeHtml) {
            html = new HtmlEscaper();
            input = html.escape(input);
        }

        this.config.customRules.forEach(function (rule) {
            input = input.replace(rule.search, rule.replacement);
        });

        return escapeHtml ? html.unescape(input) : input;
    };

    if (typeof module === 'object' && module.exports) {
        module.exports = new Replace(config);
    }

    else if (typeof window !== 'undefined') {
        var Tipograph = window.Tipograph || {};
        Tipograph.Replace = new Replace(config);
        window.Tipograph = Tipograph;
    }
})();
