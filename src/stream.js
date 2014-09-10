/**
 * @module Stream
 * @author Petr Nevyhoštěný
 * @version 0.1.1
 * @license https://github.com/nevyk/tipograph/blob/master/LICENSE MIT License
 * @description This module wraps Replace module to be used as a stream
 */

(function () {
    if (typeof window === 'undefined') {
        var Transform = require('stream').Transform;
        var replace = require('./replace');
        var languages = require('./languages');
        require('util').inherits(Stream, Transform);
        module.exports = Stream;
    }
    
    else {
        throw new Error('Tipograph stream is not supported in browser');
    }
    
    var i, len,
        parts = ['quotes', 'spaces', 'hyphens', 'mathSigns', 'symbols', 'custom'];
    
    function Stream(options) {
        if (!(this instanceof Stream)) return new Stream(options);
        Transform.call(this);
        
        options = options || {};
        
        for (i = 0, len = parts.length; i < len; i++) {
            options[parts[i]] = options[parts[i]] === false ? false : true;
        }
        
        options.html = options.html === false ? false : true;
        
        if (options.language) {
            replace.configure(languages[options.language]);
        }
        
        this._data = '';
        this._options = options;
    }
    
    Stream.prototype._transform = function (chunk, enc, done) {
        this._data += chunk;
        done();
    };
    
    Stream.prototype._flush = function (done) {
        for (i = 0, len = parts.length; i < len; i++) {
            if (this._options[parts[i]]) {
                this._data = replace[parts[i]](this._data, this._options.html);
            }
        }
        
        this.push(new Buffer(this._data));
    };
})();