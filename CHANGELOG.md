## 0.7.1

* Substitute some patterns even when they contain html entities
* Handle doctype tag and comments in HTML format

## 0.7.0

* Fix *horrible* bug in html preprocessor which caused not transforming content between te first and the last `script`, `style`, etc. tags.

## 0.6.0

* Use default dash as it is set in a language configuration. **Breaking change:** Default dash is now en dash instead of em dash.
* Allow to pass options to presets if they support it. The first option is the default type of dash.

## 0.5.2

* Update a lot of dependencies using `npm audit fix` (there were some semver incompatible bumps but it should be fine)
* Fix quotes plugin inside HTML tags

## 0.5.1

* Fix support for custom language
* Export quotes and languages properties

## 0.5.0

* Changes retrieval for more complex use cases
* Postprocessing for HTML and LaTeX output formats
* Fix of deprecation of `new Buffer()` in stream

## 0.4.5

* Czech language prepositions rule fix

## 0.4.4

* Custom rules fix
* Helper function for getting and extending default presets

## 0.4.3

Command line interface fix (change in npm package packing).

## 0.4.2

* Question and exclamation marks combinations are changed into ligature counterparts

## 0.4.1

* Quotes now work inside parentheses

## 0.4.0

Complete rewrite. Majority of rules remained the same, however, there are some changes. See the
[commit](https://github.com/pnevyk/tipograph/commit/bfaf8e380cc5ecc5e569f0e190c873aca8d2645d) for the whole picture of
the change. Tipograph has now CLI interface and demo web page.

* Quotes now take spaces into account so the transformation is not so aggressive
* Sentence breaks using hyphens are now replaced with em dash instead of en dash
* Letter range rule was removed
* Em dashes are now surrounded by hair spaces
* `<>` is not replaced with inequality sign anymore
* `*` can be now replaced with multiplication sign
* Rules for arrows were added

***

## 0.3.5

Handle apostrophe before two-digit years

## 0.3.4

Support Webpack module loader

## 0.3.3

Make some changes in stream implementation

### Stream

* languages support
* slightly different implementation

## 0.3.2

Support for streams

## 0.3.1

Support for custom defined typography rules.

### Replace

* Custom rules was added

## 0.3.0

HTML support was added. It doesn't affect any HTML tag and also doesn't transform content within `pre` and `code` tags.

### Replace

* HTML support was added

## 0.2.1

Make some changes in `quotes()` method. It replaces `,,` with double quote and `,` with single quote. It has two reasons. First, it looks horrible. Second, it breaks the feature to find quote pairs.

### Replace

* `,,` and `,` (when it is recognized as it should be) are replaced with correct quotes

## 0.2.0

A lot of tests were made. Tipograph is now almost fully covered with tests. And some changes has been made.

### Replace

* `hyphensAndDashes()` was changed into just `hyphens()`
* new method `mathSigns()` which took minus replacements from `hyphens()` and multiplication and division signs from `symbols()`
* added plus minus and inequality signs into `mathSigns()`
* ellipsis character is appointed only when three dots aren't surrounded by other dots
* spaces around multiplication sign are now required because e.g. this "2x3" needn't be the multiply operation

## 0.1.0

First release of Tipograph.

### Replace

* replacement methods `quotes()`, `spaces()`, `hyphensAndDashes()`, `symbols()` and `all()` which embraces all previous ones
* possibility of configuration what quotes will be used (because different languages require different quotes)

### Languages

* added languages:
    * chinese
    * czech
    * danish
    * english
    * finnish
    * french
    * german
    * italian
    * japanese
    * norwegian
    * polish
    * portuguese
    * russian
    * spanish
    * swedish
    * swiss
