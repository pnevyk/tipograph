/*global describe, it*/

var expect = require('expect.js');
var replace = require('../index').Replace;

describe('Quotes', function () {
    describe('- double quotes', function(){
        it('should change pair of double straight quotes to correct pair of curly quotes', function () {
            //change to curly
            expect(replace.quotes('"lorem"')).to.be('\u201Clorem\u201D');
            //keep the same
            expect(replace.quotes('"lorem')).to.be('\u0022lorem');
            //change pair to curly quotes but keep the last quotation mark the same
            expect(replace.quotes('"lorem"ipsum"')).to.be('\u201Clorem\u201Dipsum\u0022');
        });
        
        it('should find correct pairs of quotes if there are more than one', function() {
            expect(replace.quotes('"lorem" and "ipsum"')).to.be('\u201Clorem\u201D and \u201Cipsum\u201D');
        });
        
        it('should replace two consecutive commas with correct quote', function() {
            expect(replace.quotes(',,')).to.be('\u0022');
            expect(replace.quotes(',,lorem"')).to.be('\u201Clorem\u201D');
        });
    });
    
    describe('- single quotes', function(){
        it('should change pair of single straight quotes to correct pair of curly quotes', function () {
            //change to curly
            expect(replace.quotes('\'lorem\'')).to.be('\u2018lorem\u2019');
        });
        
        it('should find correct pairs of quotes if there are more than one', function() {
            expect(replace.quotes('\'lorem\' and \'ipsum\'')).to.be('\u2018lorem\u2019 and \u2018ipsum\u2019');
        });
        
        it('should replace one comma with correct quote', function() {
            expect(replace.quotes(',lorem\'')).to.be('\u2018lorem\u2019');
        });
        
        it('should not replace one comma with correct quote if it is meant really as a comma', function() {
            expect(replace.quotes('lorem, ipsum')).to.be('lorem, ipsum');
        });
    });
    
    describe('- inches', function(){
        it('should change double straight quote after a number to double prime because that is probably inch sign', function () {
            //change to double prime
            expect(replace.quotes('123"')).to.be('123\u2033');
        });
    });
    
    describe('- feet', function(){
        it('should change single straight quote after a number to single prime because that is probably foot sign', function () {
            //change to single prime
            expect(replace.quotes('123\'')).to.be('123\u2032');
        });
    });
    
    describe('- apostrophe', function(){
        it('should change single straight quote surrounded by two characters into apostrophe as well as with single straight quote which has rested', function () {
            //change to apostrophe
            expect(replace.quotes('it\'s')).to.be('it\u2019s');
            //change to apostrphe first and then manage single quotes
            expect(replace.quotes('\'it\'s\'')).to.be('\u2018it\u2019s\u2019');
            //change to apostrophe every single straight quote which has rested
            expect(replace.quotes('\'lorem')).to.be('\u2019lorem');
        });
    });
});