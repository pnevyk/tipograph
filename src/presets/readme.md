# Preset

Preset defines rules to be applied onto a content.

## Interface

```js
// see `src/languages/` for more details about language parameter
export default function (language) {
    return [
        [/* search regular expression */, /* replacement string/function */]
    ];
}
```
