# tipograph

*A little javascript library and command line tool that makes your written content more typographically correct.*

> “When you ig­nore ty­pog­ra­phy, you’re ig­nor­ing an op­por­tu­nity to im­prove the ef­fec­tive­ness of your writing.” – Matthew Butterick

Even if typography can be seen as a set of rules given by some freaks, it’s actually quite an important aspect of written content. Besides it brings an aesthetic value, it also helps a person to read the text more fluently and comfortably. And curly quotes just look great!

However, to be typographically correct one has to make some non-trivial effort, be it to learn the rules or to find out how to type all those special characters instead of these present on his keyboard. And therefore *tipograph* comes here to help. It tries its best to fix a text and apply the rules.

It’s impossible to manage all rules out there, because *tipograph* is just a set of simple transformation rules and it doesn’t understand wider linguistic context. And sometimes it will fail. But still, the help deserves to be appreciated. Especially when it costs nothing.

*In version 0.4.0 there are API breaking changes as it’s a complete rewrite. However, the migration should not be difficult (see the [guide](03to04.md)). If you are interested, [here](https://github.com/pnevyk/tipograph/tree/v0.3.5) is the documentation for the old API.*

*Tipograph is not in stable phase yet. Rules will be added and improved over time. Feel free to make suggestion or ask question if you have any.*

Note that Tipograph is focused on character substitution text-wise. Therefore it has a different goal than [Typeset](https://github.com/davidmerfield/Typeset) library which focuses on nice typography regarding appearance (although there is a small overlap in some pattern substitution).

## Demo

You can see what *tipograph* help you with [here](http://pnevyk.github.io/tipograph/).

## Installation

**In node**

```shell
# to use it as library
npm install --save tipograph

# to use it as command line utility
npm install --global tipograph
```

**In browser**

```html
<script type="text/javascript" src="https://unpkg.com/tipograph"></script>
```

## Usage

```js
// in browser, tipograph is accessible as property of window
var tipograph = require('tipograph');

// initialize new instance
var typo1 = tipograph();

// initialize new instance with different configuration
var typo2 = tipograph({
    format: 'html',
    language: 'czech',
    presets: ['quotes', 'language'],
    post: 'latex',
    options: {
        dash: 'em',
    },
});

typo2('"Ahoj <b style="color: red;">světe</b>!"') // „Ahoj <b style="color: red;">světe</b>!“

// stream support (only in node)
var fs = require('fs');

fs.createReadStream('input.txt')
    .pipe(tipograph.createStream(/*{ options }*/))
    .pipe(fs.createWriteStream('output.txt'));
```

### CLI

*Tipograph* also provides command line interface. You just need to install the package globally.

**Basic usage**

```shell
tipograph -i input.txt -o output.txt
```

**Help**

```shell
tipograph --help
```

*Note that writing the transformed content into the source file itself results in an empty file. Moreover, you should always check the output whether it’s correct and make a backup of a content if you want to write into the file back.*

## Presets

There is a number of predefined rules which are grouped into presets. By default, all these presets are used, although you can pick just those you want by passing an array into *options* object. If you want to apply your own custom rules, you can pass your preset into the array (see [preset documentation](src/presets/readme.md) for more details). Note that the order in *presets* array determines the order of rules application onto the input.

*Rules mentioned here don’t cover all typography rules, just those which are handled by tipograph. Please, read some other resources in order to be able to make your content better.*

*Description here is quite a general overview. You can see a lot of examples how these presets behave [here](rules.md).*

#### hyphens

Hyphens are present on our keyboards and are used mostly to separate multipart words (“cost-effective”) or multiword phrases which need to be together (“high-school grades”). Dashes come in two sizes: en dash and em dash. En dash is used instead of hyphen in number ranges (“1–5”), or when two consecutive hyphens are found. Em dash is use when three consecutive hyphens are found. Both can be used as a break in a sentence (“tipograph – even if it’s just a set of simple rules – can improve typography in your content”). Whether en dash or em dash will be used for this case depends on the setting of the language or it can be overridden by `dash: 'en' | 'em'` in tipograph options.

#### language

This preset only applies language specific rules defined in language given at tipograph instance initialization.

#### math

Unfortunately, majority of nice mathematical symbols is not present on our keyboard. Where it make sense, *tipograph* tries to put them instead of their poor substitues. For example, minus sign (that’s right, even minus sign has its special character) instead of hyphen, multiplication sign instead of the letter "x", etc. Imagine how you would write this formula just by hand: 2 × 3 ≠ 5.

#### quotes

Nice quotes are probably the most visible feature of correct typography. On our keyboards, we have just these straight one which are pretty ugly. However, *tipograph* tries to replace them with their correct counterparts – and it even takes language habits into account. Moreover, it attempts to handle apostrophes, inch and foot units symbols, or fix some writers' bad habbits (such as two consecutive commas in order to imitate bottom 99-shaped quotes).

#### spaces

Even that they are not visible, spaces play important role in typography. Only one word space should be used at a time. Also, in some cases, there should be non-breaking space instead of normal one (for example after some special symbols).

#### symbols

There are a lot of special symbols which we don’t know how to write and that makes us sad. Instead, we tend to use some substitues for them. And *tipograph* replaces these substitues with their actual characters, for example copyright or trademark symbols. It also changes “⁇”, “⁈” and “⁉” into ligature counterparts. Also, multiple question marks (more than two) or exclamation points (more than one) are squashed.

#### custom

If *tipograph*'s rules are not enough for you, you can define your own. Please, consider whether your rule would make sense in *tipograph* core, and if so, I will gladly accept your contribution.

```js
var custom = function (language) {
    // set of rules
    return [
        // rule is a pair of search value and its replacement
        [/-([a-z])/g, function (match, letter) {
            return letter.toUpperCase();
        }]
    ];
};

var typo1 = tipograph({ presets: [custom] });                   // use only your custom preset
var typo2 = tipograph({ presets: tipograph.extend([custom]) }); // or extend the default presets
```

## Formats

The input might be in a different format than just a plain text and it might be important to take it into account. For example, you don’t want to apply typography rules inside HTML tag. For that case, you can specify the format preprocessor. There are few already made, and again, you can define your own (see [format documentation](src/formats/readme.md) for more details).

#### html

HTML tags are kept as they are. Moreover, it also preserves whole contents of the following tags: pre, code, style, script.

#### plain

Input content is preserved as it is.

## Postprocessing

Sometimes the special characters need to be replaced with their corresponding macros/entities in an output format, so that the file can be saved as ascii-encoded file or the compiler/interpreter of the format (and the human too) understands it.

#### html

Special characters are replaced with corresponding HTML entities (in form &entity;).

#### latex

Special characters are replaced with corresponding LaTeX macros, sometimes wrapped in inline math block.

## Changes

It is possible to retrieve the information how the text was changed by tipograph. This can be useful for providing the user with these details or to implement more complex application above tipograph (e.g., WYSIWYG editor). This information is in the form of the collection of pairs where the first item of the pair represents an index slice in the source text and the second items an index slice in the output text. Probably more understandable from an example:

```js
var typo = tipograph();

typo('"lorem --- ipsum"', function (converted, changes) {
    // process the changes:
    // [
    //     [[0, 1], [0, 1]], // '"' -> '\u201C'
    //     [[6, 11], [6, 9]], // '"' -> '\u200a\u2014\u200a'
    //     [[16, 17], [14, 15]] // '"' -> '\u201D'
    // ]

    // converted: '\u201Clorem\u200a\u2014\u200aipsum\u201D'
    // return the converted text
    // this return value becomes the return value of the whole `typo` function
    // you can also return the changes
    return converted;
});

// stream
fs.createReadStream('input.txt')
    .pipe(tipograph.createStream(/*{ options }, */callback))
    .pipe(fs.createWriteStream('output.txt'));
```

## Languages

Different languages may have different rules. The most notable example are quotes. There are few predefined languages and you can define your own (see [language documentation](src/languages/readme.md) for more details). The language contains configuration for some presets (at the moment, only *quotes*) and moreover it contains rules specific for the language. Just don’t forget to include *language* preset into *presets* option.

#### chinese

*quotes: 「primary」 | 『secondary』*

#### czech

*quotes: „primary“ | ‚secondary‘*

After some one-letter prepositions and conjuctions there should be a non-breaking space.

#### danish

*quotes: »primary« | „secondary“*

#### english

*quotes: “primary” | ‘secondary’*

#### finnish

*quotes: ”primary” | ’secondary’*

#### french

*quotes: « primary » | “secondary”*

#### german

*quotes: „primary“ | ‚secondary‘*

#### italian

*quotes: «primary» | “secondary”*

#### japanese

*quotes: 「primary」 | 『secondary』*

#### japanese

*quotes: 「primary」 | 『secondary』*

#### polish

*quotes: „primary” | «secondary»*

#### portuguese

*quotes: “primary” | ‘secondary’*

#### russian

*quotes: «primary» | „secondary“*

#### spanish

*quotes: «primary» | “secondary”*

#### swedish

*quotes: ”primary” | ’secondary’*

#### swiss

*quotes: «primary» | ‹secondary›*

#### custom

If you need a language which is not included in *tipograph* core or you need to make specific changes to a built-in language, you can do so by passing the language object instead of a name. The same as in custom preset case, consider contributing your language to *tipograph* itself.

```js
var typo = tipograph({
    language: {
        quotes: [
            // french quotes (see src/quotes.js)
            [tipograph.quotes.DOUBLE_LEFT_SPACE, tipograph.quotes.DOUBLE_RIGHT_SPACE],
            [tipograph.quotes.SINGLE_LEFT_SPACE, tipograph.quotes.SINGLE_RIGHT_SPACE]
        ],
        // same interface as in custom preset
        rules: []
    }
});
```

If you want to reuse either quotes or rules definition of an existing language, it is possible using exported `languages` property, that is, using `tipograph.languages.french.quotes` and `tipograph.languages.french.rules`.

## Resources

* [Practical Typography](https://practicaltypography.com/) for the most of the rules in *tipograph*
* [Summary table](https://en.wikipedia.org/wiki/Quotation_mark#Summary_table) on Wikipedia for quote symbols in various languages
## Contributing

See [contributing guide](CONTRIBUTING.md).

## License

Tipograph is licensed under [MIT](LICENSE). Feel free to use it, contribute or spread the word.

