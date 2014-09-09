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