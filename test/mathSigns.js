/*global describe, it*/

var expect = require('expect.js');
var replace = require('../index').Replace;

describe('Math signs', function () {
    describe('- minus sign', function () {
        it('should transform a hyphen surrounded by spaces and numbers into the minus character', function () {
            expect(replace.mathSigns('3 - 2')).to.be('3 \u2212 2');
        });

        it('should transform a hyphen right before a number into the minus character', function () {
            expect(replace.mathSigns('-1')).to.be('\u22121');
        });
    });

    describe('- multiplication sign', function () {
        it('should transform "x" surrounded by spaces and numbers into the multiplication sign', function () {
            expect(replace.mathSigns('2 x 3')).to.be('2 \u00D7 3');
            expect(replace.mathSigns('2x3')).not.to.be('2\u00D73');
        });
    });

    describe('- division sign', function () {
        it('should transform forward slash surrounded by spaces and numbers into the division sign', function () {
            expect(replace.mathSigns('4 / 2')).to.be('4 \u00F7 2');
            expect(replace.mathSigns('4/2')).not.to.be('4\u00F72');
        });
    });

    describe('- plus minus sign', function () {
        it('should transform a plus sign followed by minus sign into the plus minus sign', function () {
            expect(replace.mathSigns('+-')).to.be('\u00B1');
            expect(replace.mathSigns('+ -')).not.to.be('\u00B1');
        });
    });

    describe('- inequality sign', function () {
        it('should transform "!=" sequence into the inequality sign', function () {
            expect(replace.mathSigns('!=')).to.be('\u2260');
            expect(replace.mathSigns('! =')).not.to.be('\u2260');
        });

        it('should transform "<>" sequence into the inequality sign', function () {
            expect(replace.mathSigns('<>')).to.be('\u2260');
            expect(replace.mathSigns('< >')).not.to.be('\u2260');
        });
    });
});
