#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var yargs = require('yargs');

var tipograph = require('./index');

var presets = listOf('presets');
var formats = listOf('formats');
var languages = listOf('languages');

var args = yargs
    .option('input', {
        alias: 'i',
        describe: 'Input file. If not specified, standard input is used.',
        type: 'string'
    })
    .option('output', {
        alias: 'o',
        describe: 'Output file. If not specified, standard output is used.',
        type: 'string'
    })
    .option('presets', {
        alias: 'p',
        describe: 'List of presets of rules to be applied (separate them by space).',
        choices: presets,
        type: 'array'
    })
    .option('format', {
        alias: 'f',
        describe: 'Format of the input.',
        choices: formats,
        type: 'string'
    })
    .option('language', {
        alias: 'l',
        describe: 'Language of the text.',
        choices: languages,
        type: 'string'
    })
    .version(require('./package.json').version)
    .wrap(yargs.terminalWidth())
    .argv;

var input = typeof args.input === 'undefined' ? process.stdin : fs.createReadStream(args.input);
var output = typeof args.output === 'undefined' ? process.stdout : fs.createWriteStream(args.output);
var typo = tipograph.createStream({
    presets: typeof args.presets === 'undefined' ? presets : args.presets,
    format: typeof args.format === 'undefined' ? 'plain' : args.format,
    language: typeof args.language === 'undefined' ? 'english' : args.language
});

input.on('error', function (error) {
    process.stderr.write(error.toString() + '\n');
});

output.on('error', function (error) {
    process.stderr.write(error.toString() + '\n');
});

input.pipe(typo).pipe(output);

function listOf(module) {
    return fs.readdirSync(path.join(__dirname, 'src', module)).filter(function (filename) {
        return filename !== 'index.js' && filename !== 'readme.md';
    }).map(function (filename) {
        return filename.replace('.js', '');
    });
}
