# Language

Language object is specification of a language related details.

## Interface

```js
export default {
    // there is a `src/quotes.js` file with predefined constants for several quote characters
    quotes: [['<double open char>', '<double close char>'], ['<single open char>', '<single close char>']],
    rules: [] // rules specific for the language, the rules are in the same format as initialized preset
};
```
