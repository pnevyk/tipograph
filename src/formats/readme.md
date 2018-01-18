# Format

Format function is responsible for preprocessing the input and split it into two categories: format tokens and actual content.

## Interface

```js
export default function () {
    // initialize

    return function (input) {
        // tokenize input
        // return Array<{ transform: boolean, content: string }>
        // tokens with transform=true are then concatenated and transformations are applied
        return input;
    };
}
```
