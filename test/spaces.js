/*global describe, it*/

var expect = require('expect.js');
var replace = require('../index').Replace;

describe('Spaces', function () {
    describe('- many spaces', function() {
        it('should trim more than two spaces into single one', function () {
            expect(replace.spaces('  ')).to.be(' ');
        });
    });
    
    describe('- non breaking spaces', function() {
        it('should put non breaking space after some symbols instead of normal space', function () {
            expect(replace.spaces('\u00B6 ')).to.be('\u00B6\u00A0'); //paragraph sign
            expect(replace.spaces('\u00A7 ')).to.be('\u00A7\u00A0'); //section sign
            expect(replace.spaces('\u00A9 ')).to.be('\u00A9\u00A0'); //copuright symbol
            expect(replace.spaces('\u2122 ')).to.be('\u2122\u00A0'); //trademark symbol
            expect(replace.spaces('\u00AE ')).to.be('\u00AE\u00A0'); //registered trademark symbol
        });
    });
});