'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var stream = require('stream');
var util = _interopDefault(require('util'));

function html () {
    var tag = '</?[a-zA-Z0-9-]+[^>]*>';

    // match spaces around tags too, because if the text with spaces left was transformed,
    // these spaces would probably disappear (spaces preset) and this could change semantic meanining of HTML source
    var pre = '\\s?<pre(?:>|\\s[^>]*>)[\\s\\S]*</pre>\\s?';
    var code = '\\s?<code(?:>|\\s[^>]*>)[\\s\\S]*</code>\\s?';

    var style = '<style(?:>|\\s[^>]*>)[\\s\\S]*</style>';
    var script = '<script(?:>|\\s[^>]*>)[\\s\\S]*</script>';

    return function (input) {
        var pattern = new RegExp([pre, code, style, script, tag].join('|'), 'gi');
        var result = null;
        var last = 0;
        var output = [];

        while ((result = pattern.exec(input)) !== null) {
            output.push({ transform: true, content: input.slice(last, result.index)});
            output.push({ transform: false, content: result[0]});
            last = pattern.lastIndex;
        }

        output.push({ transform: true, content: input.slice(last)});

        return output;
    };
}

function plain () {
    return function (input) {
        return [{ transform: true, content: input }];
    };
}



var formats = Object.freeze({
	html: html,
	plain: plain
});

var DOUBLE_OPEN_UP = '\u201C';
var DOUBLE_CLOSE_UP = '\u201D';
var SINGLE_OPEN_UP = '\u2018';
var SINGLE_CLOSE_UP = '\u2019';
var DOUBLE_OPEN_DOWN = '\u201E';
var SINGLE_OPEN_DOWN = '\u201A';
var DOUBLE_LEFT = '\u00AB';
var SINGLE_LEFT = '\u2039';
var DOUBLE_RIGHT = '\u00BB';
var SINGLE_RIGHT = '\u203A';
var DOUBLE_LEFT_SPACE = '\u00AB\u00A0';

var DOUBLE_SPACE_RIGHT = '\u00A0\u00BB';

var DOUBLE_TOP_CORNER = '\u300C';
var SINGLE_TOP_CORNER = '\u300E';
var DOUBLE_BOTTOM_CORNER = '\u300D';
var SINGLE_BOTTOM_CORNER = '\u300F';

/// #### chinese

var chinese = {
    quotes: [
        [DOUBLE_TOP_CORNER, DOUBLE_BOTTOM_CORNER],
        [SINGLE_TOP_CORNER, SINGLE_BOTTOM_CORNER]
    ],
    rules: []
};

/// #### czech
///
/// After some one-letter prepositions and conjuctions there should be a non-breaking space.

var czech = {
    quotes: [[DOUBLE_OPEN_DOWN, DOUBLE_OPEN_UP], [SINGLE_OPEN_DOWN, SINGLE_OPEN_UP]],
    rules: [
        // non-breaking space after one-letter prepositions and conjuctions
        [/([KkSsVvZzOoUuAI])(?:\s+)(\S)/g, '$1\u00A0$2']
    ]
};

/// #### danish

var danish = {
    quotes: [[DOUBLE_RIGHT, DOUBLE_LEFT], [DOUBLE_OPEN_DOWN, DOUBLE_OPEN_UP]],
    rules: []
};

/// #### english

var english = {
    quotes: [[DOUBLE_OPEN_UP, DOUBLE_CLOSE_UP], [SINGLE_OPEN_UP, SINGLE_CLOSE_UP]],
    rules: []
};

/// #### finnish

var finnish = {
    quotes: [[DOUBLE_CLOSE_UP, DOUBLE_CLOSE_UP], [SINGLE_CLOSE_UP, SINGLE_CLOSE_UP]],
    rules: []
};

/// #### french

var french = {
    quotes: [[DOUBLE_LEFT_SPACE, DOUBLE_SPACE_RIGHT], [DOUBLE_OPEN_UP, DOUBLE_CLOSE_UP]],
    rules: []
};

/// #### german

var german = {
    quotes: [[DOUBLE_OPEN_DOWN, DOUBLE_OPEN_UP], [SINGLE_OPEN_DOWN, SINGLE_OPEN_UP]],
    rules: []
};

/// #### italian

var italian = {
    quotes: [[DOUBLE_LEFT, DOUBLE_RIGHT], [DOUBLE_OPEN_UP, DOUBLE_CLOSE_UP]],
    rules: []
};

/// #### japanese

var japanese = {
    quotes: [
        [DOUBLE_TOP_CORNER, DOUBLE_BOTTOM_CORNER],
        [SINGLE_TOP_CORNER, SINGLE_BOTTOM_CORNER]
    ],
    rules: []
};

/// #### japanese

var norwegian = {
    quotes: [[DOUBLE_LEFT, DOUBLE_RIGHT], [SINGLE_CLOSE_UP, SINGLE_CLOSE_UP]],
    rules: []
};

/// #### polish

var polish = {
    quotes: [[DOUBLE_OPEN_DOWN, DOUBLE_CLOSE_UP], [DOUBLE_LEFT, DOUBLE_RIGHT]],
    rules: []
};

/// #### portuguese

var portuguese = {
    quotes: [[DOUBLE_OPEN_UP, DOUBLE_CLOSE_UP], [SINGLE_OPEN_UP, SINGLE_CLOSE_UP]],
    rules: []
};

/// #### russian

var russian = {
    quotes: [[DOUBLE_LEFT, DOUBLE_RIGHT], [DOUBLE_OPEN_DOWN, DOUBLE_OPEN_UP]],
    rules: []
};

/// #### spanish

var spanish = {
    quotes: [[DOUBLE_LEFT, DOUBLE_RIGHT], [DOUBLE_OPEN_UP, DOUBLE_CLOSE_UP]],
    rules: []
};

/// #### swedish

var swedish = {
    quotes: [[DOUBLE_CLOSE_UP, DOUBLE_CLOSE_UP], [SINGLE_CLOSE_UP, SINGLE_CLOSE_UP]],
    rules: []
};

/// #### swiss

var swiss = {
    quotes: [[DOUBLE_LEFT, DOUBLE_RIGHT], [SINGLE_LEFT, SINGLE_RIGHT]],
    rules: []
};



var languages = Object.freeze({
	chinese: chinese,
	czech: czech,
	danish: danish,
	english: english,
	finnish: finnish,
	french: french,
	german: german,
	italian: italian,
	japanese: japanese,
	norwegian: norwegian,
	polish: polish,
	portuguese: portuguese,
	russian: russian,
	spanish: spanish,
	swedish: swedish,
	swiss: swiss
});

/// #### hyphens
///
/// Hyphens are present on our keyboards and are used mostly to separatare multipart words ("cost-effective") or
/// multiword phrases which need to be together ("high-school grades"). Dashes come in two sizes: en dash and em dash.
/// En dash is used instead of hyphen in number ranges ("1-5"), or if two consecutive hyphens are found. Em dashed is
/// used as a break in sentence ("tipograph - even if it's just a set of simple rules - can improve typography in your
/// content"), or if three consecutive hyphens are found.
///
/// *Type of dash used as break in sentence might be dependent on language habits in the future.*

function hyphens () {
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

/// #### language
///
/// This preset only applies language specific rules defined in language given at tipograph instance initialization.

function language (language) {
    return language.rules;
}

/// #### math
///
/// Unfortunately, majority of nice mathematical symbols is not present on our keyboard. Where it make sense,
/// *tipograph* tries to put them instead of their poor substitues. For example, minus sign (that's right, even minus
/// sign has its special character) instead of hyphen, multiplication sign instead of the letter "x", etc. Imagine how
/// you would write this formula just by hand: 2 * 3 != 5.

function math () {
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
        [/!=/g, '\u2260']
    ];
}

/// #### quotes
///
/// Nice quotes are probably the most visible feature of correct typography. On our keyboards, we have just these
/// straight one which are pretty ugly. However, *tipograph* tries to replace them with their correct counterparts - and
/// it even takes language habits into account. Moreover, it attempts to handle apostrophes, inch and foot units
/// symbols, or fix some writers' bad habbits (such as two consecutive commas in order to imitate bottom 99-shaped
/// quotes).

function quotes (language) {
    var doubleOpen = language.quotes[0][0];
    var doubleClose = language.quotes[0][1];
    var singleOpen = language.quotes[1][0];
    var singleClose = language.quotes[1][1];

    return [
        // two commas into double open down
        [/(\s|^),,([^"']+)(\S)(?:"|'')/g, '$1\u201E$2$3' + doubleClose],
        // one comma into single open down in certain cases
        [/(\s|^),(?!\s)([^']+)(\S)'/g, '$1\u201A$2$3' + singleClose],
        // apostrophe
        [/([a-z])'([a-z])/gi, '$1\u2019$2'],
        // decades
        [/(\s)'(\d{2})/g, '$1\u2019$2'],
        // inches
        [/(\d)"/g, '$1\u2033'],
        // feet
        [/(\d)'/g, '$1\u2032'],
        // double curly quotes
        [/(\s|^)"(?!\s)([^"]+)(\S)"/g, '$1' + doubleOpen + '$2$3' + doubleClose],
        // single curly quotes
        [/(\s|^)'(?!\s)([^']+)(\S)'/g, '$1' + singleOpen + '$2$3' + singleClose]
    ];
}

/// #### spaces
///
/// Even that they are not visible, spaces play important role in typography. Only one word space should be used at a
/// time. Also, in some cases, there should be non-breaking space instead of normal one (for example after some special
/// symbols).

function spaces () {
    return [
        // multiple spaces
        [/ {2,}/g, ' '],
        // special symbols: (paragraph, section, copyright, trademark, registered trademark)
        [/(\u00B6|\u00A7|\u00A9|\u2122|\u00AE) /g, '$1\u00A0']
    ];
}

/// #### symbols
///
/// There are a lot of special symbols which we don't know how to write and that makes us sad. Instead, we tend to use
/// some substitues for them. And *tipograph* replaces these substitues with their actual characters, for example
/// copyright or trademark symbols.

function symbols () {
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
        [/->/g, '\u2192']
    ];
}



var presets = Object.freeze({
	hyphens: hyphens,
	language: language,
	math: math,
	quotes: quotes,
	spaces: spaces,
	symbols: symbols
});

var defaultOptions = {
    format: 'plain',
    language: 'english',
    presets: Object.keys(presets),
};

function getFormat(option) {
    if (typeof option === 'string') {
        if (typeof formats[option] !== 'undefined') {
            return formats[option]();
        } else {
            throw new Error(
                'Unsupported format: ' + option + '. Choose one from ' +
                Object.keys(formats).join(', ') + ' or pass a function.'
            );
        }
    } else if (typeof option === 'function') {
        return option();
    } else {
        throw new Error('Format option must be either string or function.');
    }
}

function getLanguage(option) {
    if (typeof option === 'string') {
        if (typeof languages[option] !== 'undefined') {
            return languages[option];
        } else {
            throw new Error(
                'Unsupported language: ' + option + '. Choose one from ' +
                Object.keys(languages).join(', ') + ' or pass a object.'
            );
        }
    } else if (typeof option === 'object') {
        if (typeof option.quotes === 'undefined') {
            option.quotes = english.quotes;
        }

        if (typeof option.custom === 'undefined') {
            option.custom = english.custom;
        }

        // TODO: check correct option interface

        return option;
    } else {
        throw new Error('Language option must be either string or object.');
    }
}

function getPresets(option, language) {
    if (Array.isArray(option)) {
        return option.map(function (preset) {
            if (typeof preset === 'string' && typeof presets[preset] === 'undefined') {
                throw new Error(
                    'Unsupported preset: ' + preset + '. Choose one from ' + Object.keys(presets).join(', ') + '.'
                );
            } else if (Array.isArray(preset)) {
                return preset(language);
            } else {
                return presets[preset](language);
            }
        });
    } else {
        throw new Error('Presets option must be either array containing a preset name or preset definition.');
    }
}

function tipograph(options) {
    options = Object.assign({}, defaultOptions, options);

    var format = getFormat(options.format);
    var language = getLanguage(options.language);
    var pipeline = getPresets(options.presets, language);

    return function (input) {
        if (typeof input !== 'string') {
            throw new Error('Only strings are supported as input.');
        }

        // preprocess input
        input = format(input);

        var tokens = [];
        var content = '';

        // concatenate tokens but replace each formatting token with a placeholder
        for (var i = 0; i < input.length; i++) {
            if (input[i].transform) {
                content += input[i].content;
            } else {
                content += '<tipograph[' + tokens.length + ']>';
                tokens.push(input[i].content);
            }
        }

        // apply transformations
        for (var p = 0; p < pipeline.length; p++) {
            for (var r = 0; r < pipeline[p].length; r++) {
                var rule = pipeline[p][r];

                content = content.replace(rule[0], rule[1]);
            }
        }

        // replace placeholders with their original content
        return content.replace(/<tipograph\[(\d+)\]>/g, function (match, index) {
            return tokens[index];
        });
    };
}

util.inherits(TipographStream, stream.Transform);
function TipographStream(options) {
    if (!(this instanceof TipographStream)) {
        return new TipographStream(options);
    }

    stream.Transform.call(this);

    this._data = '';
    this._typo = tipograph(options);
}

TipographStream.prototype._transform = function (chunk, enc, done) {
    this._data += chunk;
    done();
};

TipographStream.prototype._flush = function (done) {
    this.push(new Buffer(this._typo(this._data)));
    done();
};

function createStream (options) {
    return new TipographStream(options);
}

module.exports = tipograph;
module.exports.createStream = createStream;
