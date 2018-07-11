# Contributing Guide

## Documentation

Readme file is generated from `.readme.md` by `npm run doc`. For updating the readme therefore update `.readme.md`
first, run `npm run doc` and then commit both files.

Documentation for formats, languages and presets lay in source files as comments, so for updating them you need to
update the comments and then run `npm run doc` as in the previous case.

Rules' reference file is generated from rules' test cases which can be found in source files of presets.

## Code

See appropriate documentation for [formats](src/formats/readme.md), [languages](src/languages/readme.md) and
[presets](src/presets/readme.md). As usual, try to make features and fixes isolated from other changes.

## Git

There are no rules for commit messages or branching schema. Just fork the repository, make your changes (better in a
branch different from *master*) and make a pull request to the master of this repository.

## Tests

Tests are placed beside actual functionality (i.e., tests for *hyphens* preset are in `src/presets/hyphens.js`). You
should make tests for every feature/fix you added. Run the tests with `npm run test`.
