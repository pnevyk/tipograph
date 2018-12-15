import { Transform } from 'stream';
import util from 'util';

import tipograph from './tipograph';

util.inherits(TipographStream, Transform);
function TipographStream(options, callback) {
    if (!(this instanceof TipographStream)) {
        return new TipographStream(options, callback);
    }

    Transform.call(this);

    this._data = '';
    if (typeof options === 'function') {
        this._typo = tipograph();
        this._callback = options;
    } else {
        this._typo = tipograph(options);
        this._callback = callback;
    }
}

TipographStream.prototype._transform = function (chunk, enc, done) {
    this._data += chunk;
    done();
};

TipographStream.prototype._flush = function (done) {
    this.push(Buffer.from(this._typo(this._data, this._callback)));
    done();
};

export default function (options) {
    return new TipographStream(options);
}
