/*global describe, it*/

var expect = require('expect.js');

var Readable = require('stream').Readable;
var Writable = require('stream').Writable;

describe('Stream', function () {
    describe('- keeping behaviour', function (){
        it('should apply the same changes as Replace module does', function () {
            var source = Readable();
            var assertion = Writable();

            source._read = function () {
                this.push('"lorem"');
                this.push('ipsum"');
                this.push(null);
            };

            assertion._write = function (chunk, enc, done) {
                expect(chunk.toString()).to.be('\u201Clorem\u201Dipsum\u0022');
                done();
            };

            source.pipe(require('../index').createStream()).pipe(assertion);
        });
    });

    describe('- applying options', function (){
        it('should not apply functions if we do not want to', function () {
            var source = Readable();
            var assertion = Writable();

            source._read = function () {
                this.push('"lorem"');
                this.push(' - ');
                this.push('ipsum"');
                this.push(null);
            };

            assertion._write = function (chunk, enc, done) {
                expect(chunk.toString()).to.be('\u201Clorem\u201D - ipsum\u0022');
                done();
            };

            source.pipe(require('../index').createStream({ hyphens : false })).pipe(assertion);
        });
    });
});
