# Postprocessing

Postprocessing applies transformations from special characters to specific macros/sequences of a output format. This
enables exporting an input text to an ascii-encoded file, but with tipograph rules being applied (to an extent which the
output format supports).

## Interface

```js
export default {
    'c': 'replacement'
};
```
