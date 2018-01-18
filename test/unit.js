var chalk = require('chalk');
var tipograph = require('../src/tipograph').default;

module.exports = function run(config) {
    var total = 0;
    var errors = 0;
    var warnings = 0;

    for (var name in config.modules) {
        var tests = config.load(name);

        if (tests === null) {
            process.stdout.write(chalk.yellow('no tests for ' + name) + '\n');
            warnings++;
        } else {
            var transform = tipograph(config.init(name));

            for (var i = 0; i < tests.length; i++) {
                var result = config.test(tests[i], transform, name);

                if (result !== tests[i].expected) {
                    process.stdout.write(chalk.red(name + ' > ' + tests[i].description) + '\n');
                    process.stdout.write(chalk.gray('    expected: ' + tests[i].expected) + '\n');
                    process.stdout.write(chalk.gray('    actual: ' + result) + '\n');
                    process.stdout.write('\n');

                    errors++;
                }

                total++;
            }
        }
    }

    if (errors === 0 && warnings === 0) {
        process.stdout.write(chalk.green(total + ' tests passed') + '\n');
    } else {
        process.stdout.write('\n');
        process.stdout.write(chalk.red('errors: ' + errors) + '\n');
        process.stdout.write(chalk.yellow('warnings: ' + warnings) + '\n');
        process.exit(1);
    }
};
