/*global describe, it*/

var expect = require('expect.js');
var replace = require('../index').Replace;

var regexp = /(.)ř/g,
    replacement = '$1r',
    input = 'trakař',
    output = 'trakar';

describe('Custom', function() {
    beforeEach(function () {
        replace.addCustomRule(regexp, replacement);
    });
    
    describe('- adding', function() {
        it('should add custom rule into config', function () {
            expect(replace.config.customRules).to.have.length(1);
            expect(replace.config.customRules[0]).to.have.keys(['search', 'replacement']);
            expect(replace.config.customRules[0].search).to.be(regexp);
            expect(replace.config.customRules[0].replacement).to.be(replacement);
        });
        
        it('should throw error if the first argument is neither regular expression nor string', function () {
            expect(replace.addCustomRule).withArgs([], '').to.throwError();
            expect(replace.addCustomRule).withArgs({}, '').to.throwError();
            expect(replace.addCustomRule).withArgs(function () {}, '').to.throwError();
            expect(replace.addCustomRule).withArgs(0, '').to.throwError();
        });
        
        it('should throw error if the second argument is neither string nor function', function () {
            expect(replace.addCustomRule).withArgs('', []).to.throwError();
            expect(replace.addCustomRule).withArgs('', {}).to.throwError();
            expect(replace.addCustomRule).withArgs('', 0).to.throwError();
            expect(replace.addCustomRule).withArgs('', /foo/g).to.throwError();
        });
    });
    
    describe('- replacing', function() {
        it('should apply custom rules on given input', function () {
            expect(replace.custom(input)).to.be(output);
        });
    });
});