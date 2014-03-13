# Tipograph

First of all - correct typography is important. Even if we aren't typography freaks we must say that curly quotes look much better than straight ones. But, let's be honest, not everyone is too thorough to learn all these typography rules. And even if we know them, it's pretty frustrating to press these alt/option combinations for em dash or copyright symbol.

And hence there is Tipograph. It can manage a lot of these rules for you and then you could concentrate just on your words. After you are done take your text and pass it into any Replace module method. It will return the typographically correct sequence of characters. Isn't it amazing! And it can be used in both browser and Node.

When creating this I don't invent all these rules myself. I have been following some of (I think trustworthy) [resources](#resources). It's impossible to follow all these rules because some of them cannot be managed by code without a complex understanding of context. I hope this is quite enough. And a lot improvements would come.

If you are interested in Tipograph, maybe you will be pleased when I tell you I am going to write module which will provide live replacement and will be useful for (your) word processor.

## Note

I would very appreciate if you could check the source code. There are some notes starting with `NOTE:` and it would be really great if you could tell me your opinion (for example as an issue) about these or not only these. And it would be even better if you could support it via example. Thank you for your possible feedback.

## Installation

### Node

```bash
$ npm install tipograph
```

### Browser

```html
<script type="text/javascript" src="path/to/replace.js"></script>
<!-- optional -->
<script type="text/javascript" src="path/to/languages.js"></script>
```

## Usage

Usage of Tipograph is really simple. Just pass the input and get the transformed result.

```js
//node
var replace = require('tipograph').Replace;

//browser
var replace = window.Tipograph.Replace;

//usage - replace all what is shown below
replace.all('"I\'m Tipograph - a library for better typography"');
```

It will change __"I'm Tipograph - a library for better typography"__ into __“I’m Tipograph – a library for better typography”__. Isn't it much better? I think it is. And this is just beginning!

## What it can do

### Quotes

Tipograph finds pairs of straight quotes (both double and single) and replaces them with curly ones. And it also respects format/language you have defined (see [quotes in different languages](#languages)). Furthermore, Tipograph replaces all single straight quotes which are determined as apostrophe with correct character. Also foot and inch signs are replaced correctly with primes or double primes respectively. Next feature of Tipograph is to recognize some bad habbits of users - some people type two commas in order to make quote look like double low-9 quotation mark or one comma to make quote look like single low-9 quotation mark. This is horrible and even more - it breaks the feature to find quote pairs. In the case of one comma it recognizes what should be comma and what should be single quote.

```js
var output = replace.quotes('your text');
```

### Spaces

There should't be more than two spaces within your text so Tipograph replaces them with single one. And it also put non breaking space after some symbols where it should be. Currently the symbols are:

* paragraph (&para;)
* section sign (&sect;)
* copyright (&copy;)
* trademark (&trade;)
* registered trademark (&reg;)

```js
var output = replace.spaces('your text');
```

### Hyphens

Some people type two consecutive hyphens (`--`) as representation of en dash (&ndash;) and three consecutive hyphens (`---`) as representation of em dash (&mdash;). This is wrong. Therefore Tipograph replaces these sequences with correct characters. Furthermore, ranges of values should be written with en dashes. So Tipograph tries to recognize ranges and replaces hyphen with en dash. It also finds sentence breaks where should be used en dash (or em dash without spaces, this will be configuration option) and corrects it.

```js
var output = replace.hyphens('your text');
```

### Math signs

A lot of people use generally accepted substitutions for some math signs (for example letter "x" for multiplication symbol or "!=" sequence instead of inequality sign). The correct characters look much better than generally used ones. Replaced signs:

* __minus__ (`2 - 1`, `-3`, not `2-1`) - hyphen is replaced with minus character (&ndash;)
* __multiplication__ (`2 x 3`, not `1x2`) - letter "x" is replaced with multiplication sign (&times;)
* __division__ (`6 / 3`, not `10/5`) - forward slash is replaced with division sign (&divide;)
* __plus-minus__ (`+-`) - sequence of plus and hyphen is replaced with plus-minus sign (&plusmn;)
* __inequality__ (`!=`, `<>`) - these sequences, rather used in programming, are replaced with correct inequality sign (&ne;)

```js
var output = replace.mathSigns('your text');
```

### Symbols

If we or our users are lazy to learn how to type correct special symbols (see below) we need to replace generally used substitutions with these symbols. In this moment the symbols are:

* __copyright__ - `(c)`, `(C)` => &copy;
* __trademark__ - `(tm)`, `(TM)` => &trade;
* __registered trademark__ - `(r)`, `(R)` => &reg;
* __ellipsis__ - `...`, not `....` => &hellip;

```js
var output = replace.symbols('your text');
```

<a name="languages"></a>
## Quotes in different languages

Tipograph knows that different quotes are used in different languages. If you think I should choose different marks in your language, feel free to post an issue. Currently the langugaes are:

* _chinese_ (「double」 『single』)
* _czech_ („double“ ‚single‘)
* _danish_ (»double« „single“)
* _english_ (“double” ‘single’)
* _finnish_ (”double” ’single’)
* _french_ (« double » “single”)
* _german_ („double“ ‚single‘)
* _italian_ («double» “single”)
* _japanese_ (「double」 『single』)
* _norwegian_ («double» ’single’)
* _polish_ („double” «single»)
* _portuguese_ (“double” ‘single’)
* _russian_ («double» „single“)
* _spanish_ («double» “single”)
* _swedish_ (”double” ’single’)
* _swiss_ («double» ‹single›)

But you can use your own configuration of quotes. Just choose from these ones:

* _double-open-up_ for open double quotes shaped as <sup>66</sup>
* _single-open-up_ for open single quotes shaped as <sup>6</sup>
* _double-close-up_ for closing double quotes shaped as <sup>99</sup>
* _single-close-up_ for closing single quotes shaped as <sup>9</sup>
* _double-open-down_ for open double quotes shaped as <sub>99</sub>
* _single-open-down_ for open single quotes shaped as <sub>99</sub>
* _double-left_ for left-pointing double angle quotes (&laquo;)
* _single-left_ for left-pointing single angle quotes (&lsaquo;)
* _double-right_ for right-pointing double angle quotes (&raquo;)
* _single-right_ for right-pointing single angle quotes (&rsaquo;)
* _double-left-space_ for left-pointing double angle quotes (&laquo;) followed by non breaking space
* _single-left-space_ for left-pointing single angle quotes (&lsaquo;) followed by non breaking space
* _double-space-right_ for right-pointing double angle quotes (&raquo;) followed by non breaking space
* _single-space-right_ for right-pointing single angle quotes (&rsaquo;) followed by non breaking space
* _double-top-corner_ for left corner bracket used in CJK (&#12300;)
* _single-top-corner_ for left white corner bracket used in CJK (&#12302;)
* _double-bottom-corner_ for right corner bracket used in CJK (&#12301;)
* _single-bottom-corner_ for right white corner bracket used in CJK (&#12303;)

### Configuration

```js
var languages = require('tipograph').Languages;

//configure with predefined languages
replace.configure(languages.czech);
//or with custom string in format of replacement for:
//left-double right-double left-single right-single
replace.configure({
    quotesFormat : 'double-open-down double-open-up single-open-down single-open-up'
});
```

<a name="resources"></a>
## Resources

* [Practical Typography](http://practicaltypography.com/) for a lot of typography rules. This web is really understandable yet complete.
* [International variation in quotation marks](http://en.wikipedia.org/wiki/International_variation_in_quotation_marks) for quotes configuration of all languages currently defined

## Todo

* ampersand symbol should be surrounded by non breaking spaces
* non breaking space between last two words of each paragraph to avoid a final line of text with only one word (?)
* make configurable what to replace and what not to (?)
* __allow to pass callback into each method which will be called with "changes" object (useful for showing to user what was changed)__
* add support for other symbols such as `<-`, `->`, `<->`, `<3`, `x^2`, ...
* add support for language related non breaking spaces e.g. after prepositions
* __add possibility to define custom typography rules__
* __keep HTML tags as they are (don't replace quotes, ...)__

## License

Tipograph is MIT licensed. Feel free to use it, contribute or spread the word. Created with love by Petr Nevyhoštěný ([Twitter](https://twitter.com/nevyk3)).