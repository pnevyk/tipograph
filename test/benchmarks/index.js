var fs = require('fs');
var path = require('path');

var benchmarks = [
    {
        name: 'Lorem ipsum',
        content: 'lorem.txt'
    },
    {
        name: 'Typography at Wikipedia',
        content: 'typography.html'
    },
];

module.exports = benchmarks.map(function (item) {
    return {
        name: item.name,
        content: fs.readFileSync(path.join(__dirname, item.content)).toString()
    };
});
