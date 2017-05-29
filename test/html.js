/*global describe, it*/

var expect = require('expect.js');
var replace = require('../index').Replace;

describe('Html', function () {
    describe('- `pre` and `code` tags', function () {
        it('should keep content within `pre` or `code` exactly the same', function () {
            var pre = '<pre>\r\n    "lorem"; \'ipsum\'; 2 - 1; 4 / 2; 3 != 4;</pre>',
                code = '<code>\r\n    "lorem"; \'ipsum\'; 2 - 1; 4 / 2; 3 != 4;</code>';
            expect(replace.all(pre)).to.be(pre);
            expect(replace.all(code)).to.be(code);
        });
    });

    describe('- other tags', function () {
        it('should keep html pair tags as they are but transform a content within', function () {
            var before = '<a href="path/to/somewhere">\r\n    "lorem - ipsum"</a>',
                after = '<a href="path/to/somewhere">\r\n \u201Clorem \u2013 ipsum\u201D</a>';

            expect(replace.all(before)).to.be(after);
        });

        it('should keep html single tags exactly the same', function () {
            var input = '<input type="text" name="test" />',
                br = '<br>';

            expect(replace.all(input)).to.be(input);
            expect(replace.all(br)).to.be(br);
        });

        it('should also support nested html tags', function () {
            var before = '<ul class="menu">"lorem"<li id="first">"ipsum"</li></ul>',
                after = '<ul class="menu">\u201Clorem\u201D<li id="first">\u201Cipsum\u201D</li></ul>';

            expect(replace.all(before)).to.be(after);
        });
    });
});
