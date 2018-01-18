import { Transform } from 'stream';
import util from 'util';

import tipograph from './tipograph';

util.inherits(TipographStream, Transform);
function TipographStream(options) {
    if (!(this instanceof TipographStream)) {
        return new TipographStream(options);
    }

    Transform.call(this);

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

export default function (options) {
    return new TipographStream(options);
}
