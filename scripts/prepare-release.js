var exec = require('child_process').execSync;

var pkg = require('../package.json');

var tags = exec('git tag').toString().split('\n');
var version = tags[tags.length - 2].slice(1);

if (version === pkg.version) {
    echo('update version in package.json');
    exit(1);
}

if (exec('cat CHANGELOG.md').toString().indexOf('## ' + pkg.version) === -1) {
    echo('write changes into changelog');
    exit(1);
}

echo(version + ' -> ' + pkg.version);
execAndExitOnFail('npm run test', 'tests failed');
execAndExitOnFail('npm run build', 'build failed');
exec('npm run doc');
exec('git add package.json package-lock.json CHANGELOG.md README.md rules.md');
echo('if everything is correct, run these commands:');
echo('    git commit -m "Release v' + pkg.version + '"');
echo('    git tag -a v' + pkg.version + ' -m "Release v' + pkg.version + '"');
echo('    git push');
echo('    git push --tags');
echo('    npm publish');

function echo(message) {
    process.stdout.write(message + '\n');
}

function exit(code) {
    process.exit(code);
}

function execAndExitOnFail(command, message) {
    try {
        return exec(command, {
            stdio: 'ignore'
        });
    } catch (e) {
        echo(message);
        exit(1);
    }
}
