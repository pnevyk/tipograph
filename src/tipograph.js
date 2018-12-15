import * as formats from './formats/index';
import * as languages from './languages/index';
import * as presets from './presets/index';
import * as post from './post/index';

import { find } from './changes';

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
            option.quotes = languages['english'].quotes;
        }

        if (typeof option.custom === 'undefined') {
            option.custom = languages['english'].custom;
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
            } else if (typeof preset === 'function') {
                return preset(language);
            } else {
                return presets[preset](language);
            }
        });
    } else {
        throw new Error('Presets option must be either array containing a preset name or preset definition.');
    }
}

function getPost(option) {
    if (typeof post[option] !== 'undefined') {
        return post[option];
    } else if (typeof option === 'undefined') {
        return null;
    } else if (typeof option === 'string') {
        throw new Error(
            'Unsupported postprocessing format: ' + option + '. Choose one from ' +
            Object.keys(post).join(', ') + ' or pass a object.'
        );
    } else {
        throw new Error('Post option must be string corresponding to an available postprocessing format.');
    }
}

export default function tipograph(options) {
    options = Object.assign({}, defaultOptions, options);

    var format = getFormat(options.format);
    var language = getLanguage(options.language);
    var pipeline = getPresets(options.presets, language);
    var postMap = getPost(options.post);

    return function (input, callback) {
        if (typeof input !== 'string') {
            throw new Error('Only strings are supported as input.');
        }

        // preprocess input
        var processed = format(input);

        var tokens = [];
        var content = '';

        // concatenate tokens but replace each formatting token with a placeholder
        for (var i = 0; i < processed.length; i++) {
            if (processed[i].transform) {
                content += processed[i].content;
            } else {
                content += '<tipograph[' + tokens.length + ']>';
                tokens.push(processed[i].content);
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
        content = content.replace(/<tipograph\[(\d+)\]>/g, function (match, index) {
            return tokens[index];
        });

        if (postMap !== null) {
            var postprocessed = '';
            for (var j = 0; j < content.length; j++) {
                if (typeof postMap[content[j]] === 'string') {
                    postprocessed += postMap[content[j]];
                } else {
                    postprocessed += content[j];
                }
            }
            content = postprocessed;
        }

        if (typeof callback === 'function') {
            var changes = find(input, content);
            return callback(content, changes);
        } else {
            return content;
        }
    };
}

tipograph.presets = function (extensions) {
    var names = Object.keys(presets);

    if (Array.isArray(extensions)) {
        return names.concat(extensions);
    } else if (typeof extensions !== 'undefined') {
        throw new Error('Presets can be extended only with an array of custom presets');
    } else {
        return names;
    }
};
