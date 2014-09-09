/**
 * @module Stream
 * @author Petr Nevyhoštěný
 * @version 0.1.0
 * @license https://github.com/nevyk/tipograph/blob/master/LICENSE MIT License
 * @description This module wraps Replace module to be used as a stream
 */

(function () {
    if (typeof window === 'undefined') {
        var Transform = require('stream').Transform;
        require('util').inherits(Stream, Transform);
        module.exports = Stream;
    }
    
    var i, len,
        parts = ['quotes', 'spaces', 'hyphens', 'mathSigns', 'symbols', 'custom'];
    
    function Stream(replace, options) {
        if (!(this instanceof Stream)) return new Stream(replace);
        Transform.call(this);
        
        options = options || {};
        
        for (i = 0, len = parts.length; i < len; i++) {
            options[parts[i]] = options[parts[i]] === false ? false : true;
        }
        
        options.html = options.html === false ? false : true;
        
        this.replace = replace;
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
                this._data = this.replace[parts[i]](this._data, this._options.html);
            }
        }
        
        this.push(new Buffer(this._data));
    };
})();