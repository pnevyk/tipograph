export default function () {
    return function (input) {
        return [{ transform: true, content: input }];
    };
}


export function tests() {
    return [
        {
            description: 'plain',
            input: 'lorem ipsum',
            expected: 'lorem ipsum'
        }
    ];
}
