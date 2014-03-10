/*global describe, it*/

var expect = require('expect.js');
var replace = require('../index').Replace;

describe('Hyphens', function() {
    describe('- em dashes', function() {
        it('should transform three consecutive hyphens into one em dash', function () {
            expect(replace.hyphens('---')).to.be('\u2014');
        });
    });
    
    describe('- en dashes', function() {
        it('should transform two consecutive hyphens into one en dash', function () {
            expect(replace.hyphens('--')).to.be('\u2013');
        });
    });
    
    describe('- sentence breaks', function() {
        it('should transform a hyphen surrounded by spaces into one en dash', function () {
            expect(replace.hyphens(' - ')).to.be(' \u2013 ');
        });
    });
    
    describe('- range', function() {
        it('should transform a hyphen surrounded by numbers into the en dash', function () {
            expect(replace.hyphens('1-5')).to.be('1\u20135');
        });
        
        it ('should transform a hyphen surrounded by upper case (not lower case) into the en dash', function() {
            expect(replace.hyphens('A-Z')).to.be('A\u2013Z');
            expect(replace.hyphens('a-z')).not.to.be('a\u2013z');
        });
    });
});