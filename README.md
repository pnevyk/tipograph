# Tipograph

First of all - correct typography is important. Even if we weren't typography freaks we would must say that curly quotes look much better than straight ones. But on the other hand, some of us or our users are lazy to learn about typography and how to type copyright symbol, or dash instead of hyphen.

And hence there is Tipograph! It's library which transforms your text input into typographically (hopefully) correct sequence of characters. It can be used in browser or as NodeJS module.

When creating this I followed this amazing web - [Practical Typography](http://practicaltypography.com/). I have read through it and make Tipograph. It's impossible to follow all these rules because some of them cannot be managed by code without a complex understanding of context. I hope this is quite enough. And some improvements would come.

I also want to make better and more useful documentation. And I am going to do module which will provide live replacement and will be useful for word processors. Wish me luck :D.

## Usage

Usage of Tipograph is really simple. Just pass the input and get the transformed result.

```js
//node
var replace = require('Tipograph').Replace;

//browser
var replace = window.Tipograph.Replace;

//usage

replace.all('"I\'m Tipograph - library for better typography"')
//“I’m Tipograph – library for better typography”
```

## What it can do

### Quotes

Tipograph replaces straight double and single quotes into curly ones. It can also respect format used in specified language. It also replaces quotes in feet and inches with primes or double primes respectively.

### Spaces

Tipograph replaces more than one space with single one. And it also put non breaking space after some symbols where it should be.

### Hyphens and dashes

People usually type hyphen where should be dash. Tipograph tries to put it right. `--` is replaced with en dash and `---` is replaced with em dash. And it also knows the correct character for minus.

### Symbols

Tipograph knows some important symbols. Actually these ones:

* Copyright - (c) => ©

* Trademark - (tm) => ™

* Registered trademark - (r) => ®

* Multiplication sign - number x number => number × number

* Division sign - number / number => number ÷ number

* Ellipsis - ... => …

## Quotes in my language

Tipograph knows that different quotes are used in different languages. I have been following [wikipedia article](http://en.wikipedia.org/wiki/International_variation_in_quotation_marks) about that. If you think I should choose different marks in your language, feel free to post an issue. See `Languages` module to know defined languages.

But you aren't limited to these languages. You can configure Replace module. See `Replace` module for examples.

```js
var languages = require('Tipograph').Languages;

replace.configure(languages.czech);
//or
replace.configure({
    quotesFormat : 'double-open-down double-open-up single-open-down single-open-up'
});
```

## License

Tipograph is MIT licensed. Feel free to use it, contribute or spread the word.
