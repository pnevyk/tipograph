/*global describe, it*/

var expect = require('expect.js');
var replace = require('../index').Replace;

describe('Symbols', function () {
    describe('- copyright', function () {
        it('should transform both "(c)" and "(C)" sequences into copyright symbol', function () {
            expect(replace.symbols('(c)')).to.be('\u00A9\u00A0');
            expect(replace.symbols(' (c)')).to.be(' \u00A9\u00A0');
            expect(replace.symbols('(c) ')).to.be('\u00A9\u00A0');
            expect(replace.symbols('2(c)')).not.to.be('2\u00A9\u00A0');
            expect(replace.symbols('(C)')).to.be('\u00A9\u00A0');
            expect(replace.symbols(' (C)')).to.be(' \u00A9\u00A0');
            expect(replace.symbols('(C) ')).to.be('\u00A9\u00A0');
            expect(replace.symbols('2(C)')).not.to.be('2\u00A9\u00A0');
        });
    });
    
    describe('- trademark', function () {
        it('should transform both "(tm)" and "(TM)" sequences into trademark symbol', function () {
            expect(replace.symbols('(tm)')).to.be('\u2122\u00A0');
            expect(replace.symbols('(tm) ')).to.be('\u2122\u00A0');
            expect(replace.symbols('(TM)')).to.be('\u2122\u00A0');
            expect(replace.symbols('(TM) ')).to.be('\u2122\u00A0');
        });
    });
    
    describe('- registered trademark', function () {
        it('should transform both "(r)" and "(R)" sequences into registered trademark symbol', function () {
            expect(replace.symbols('(r)')).to.be('\u00AE\u00A0');
            expect(replace.symbols('(r) ')).to.be('\u00AE\u00A0');
            expect(replace.symbols('(R)')).to.be('\u00AE\u00A0');
            expect(replace.symbols('(R) ')).to.be('\u00AE\u00A0');
        });
    });
    
    describe('- ellipsis', function() {
        it('should transform three consecutive dots into ellipsis', function () {
            expect(replace.symbols('...')).to.be('\u2026');
            expect(replace.symbols('a...z')).to.be('a\u2026z');
        });
        
        it('should not transform three consecutive dots into ellipsis if they are surrounded by other dots', function () {
            expect(replace.symbols('....')).not.to.be('\u2026');
            expect(replace.symbols('.....')).not.to.be('\u2026');
            expect(replace.symbols('......')).not.to.be('\u2026\u2026');
        });
    });
});