# tipograph

*A little javascript library and command line tool that makes your written content more typographically correct.*

> “When you ig­nore ty­pog­ra­phy, you’re ig­nor­ing an op­por­tu­nity to im­prove the ef­fec­tive­ness of your writing.” — Matthew Butterick

Even if typography can be seen as a set of rules given by some freaks, it’s actually quite an important aspect of written content. Besides it brings an aesthetic value, it also helps a person to read the text more fluently and comfortably. And curly quotes just look great!

However, to be typographically correct one has to make some non-trivial effort, be it to learn the rules or to find out how to type all those special characters instead of these present on his keyboard. And therefore *tipograph* comes here to help. It tries its best to fix a text and apply the rules.

It’s impossible to manage all rules out there, because *tipograph* is just a set of simple transformation rules and it doesn’t understand wider linguistic context. And sometimes it will fail. But still, the help deserves to be appreciated. Especially when it costs nothing.

*In version 0.4.0 there are API breaking changes as it’s a complete rewrite. However, the migration should not be difficult. [Here](https://github.com/pnevyk/tipograph/tree/v0.3.5) is the documentation for the old API.*

*Tipograph is not in stable phase yet. Rules will be added and improved over time. Feel free to make suggestion or ask question if you have any.*

## Installation

**In node**

```shell
# to use it as library
npm install --save tipograph

# to use it as command line utility
npm install --global tipograph
```

**In brower**

```html
<script type="text/javascript" src="dest/tipograph.min.js"></script>
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
    presets: ['quotes', 'language']
});

typo2('"Ahoj <b>světe</b>!"') // „Ahoj <b>světe</b>!“

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

Hyphens are present on our keyboards and are used mostly to separatare multipart words (“cost-effective”) or multiword phrases which need to be together (“high-school grades”). Dashes come in two sizes: en dash and em dash. En dash is used instead of hyphen in number ranges (“1–5”), or if two consecutive hyphens are found. Em dashed is used as a break in sentence (“tipograph — even if it’s just a set of simple rules — can improve typography in your content”), or if three consecutive hyphens are found.

*Type of dash used as break in sentence might be dependent on language habits in the future.*

#### language

This preset only applies language specific rules defined in language given at tipograph instance initialization.

#### math

Unfortunately, majority of nice mathematical symbols is not present on our keyboard. Where it make sense, *tipograph* tries to put them instead of their poor substitues. For example, minus sign (that’s right, even minus sign has its special character) instead of hyphen, multiplication sign instead of the letter "x", etc. Imagine how you would write this formula just by hand: 2 × 3 ≠ 5.

#### quotes

Nice quotes are probably the most visible feature of correct typography. On our keyboards, we have just these straight one which are pretty ugly. However, *tipograph* tries to replace them with their correct counterparts — and it even takes language habits into account. Moreover, it attempts to handle apostrophes, inch and foot units symbols, or fix some writers' bad habbits (such as two consecutive commas in order to imitate bottom 99-shaped quotes).

#### spaces

Even that they are not visible, spaces play important role in typography. Only one word space should be used at a time. Also, in some cases, there should be non-breaking space instead of normal one (for example after some special symbols).

#### symbols

There are a lot of special symbols which we don’t know how to write and that makes us sad. Instead, we tend to use some substitues for them. And *tipograph* replaces these substitues with their actual characters, for example copyright or trademark symbols.

## Formats

The input might be in a different format than just a plain text and it might be important to take it into account. For example, you don’t want to apply typography rules inside HTML tag. For that case, you can specify the format preprocessor. There are few already made, and again, you can define your own (see [format documentation](src/formats/readme.md) for more details).

#### html

HTML tags are kept as they are. Moreover, it also preserves whole contents of the following tags: pre, code, style, script.

#### plain

Input content is preserved as it is.

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

## Resources

* [Practical Typography](https://practicaltypography.com/) for the most of the rules in *tipograph*
* [Summary table](https://en.wikipedia.org/wiki/Quotation_mark#Summary_table) on Wikipedia for quote symbols in various languages
## License

Tipograph is licensed under [MIT](LICENSE). Feel free to use it, contribute or spread the word.

