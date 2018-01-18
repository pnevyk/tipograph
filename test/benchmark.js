var chalk = require('chalk');

var benchmarks = require('./benchmarks');
var formats = require('../src/formats');
var presets = require('../src/presets');
var tipograph = require('../src/tipograph').default;

var REPEATS = 10;

var presetsArg = process.argv.length > 2 ? process.argv.slice(2) : Object.keys(presets);

if (presetsArg[0] === '-') {
    presetsArg = [];
}

process.stdout.write(chalk.gray('presets: ') + presetsArg.join(', ') + '\n');
process.stdout.write('\n');

for (var format in formats) {
    process.stdout.write(chalk.blue(format) + '\n');
    var transform = tipograph({ format: format, presets: presetsArg });

    for (var b = 0; b < benchmarks.length; b++) {
        var result = benchmark(transform, benchmarks[b].content);
        process.stdout.write(chalk.gray('    ' + benchmarks[b].name + ': ') + result + ' \u00B5s' + '\n');
    }

    process.stdout.write('\n');
}

function benchmark(transform, content) {
    var runs = [];

    for (var i = 0; i < REPEATS; i++) {
        var start = process.hrtime();
        transform(content);
        var diff = process.hrtime(start);

        runs.push(diff[0] * 1e9 + diff[1]);
    }

    var sum = runs.reduce(function (sum, value) {
        return sum + value;
    });

    var avg = sum / runs.length;

    return Math.round(avg) / 1e3;
}
