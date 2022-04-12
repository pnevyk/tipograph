import eslint from '@rollup/plugin-eslint';
import license from 'rollup-plugin-license';
import { terser } from 'rollup-plugin-terser';
import gzip from 'rollup-plugin-gzip';

const banner = 'tipograph v<%= pkg.version %> | Copyright (c) <%= moment().format(\'YYYY\') %> Petr Nevyhoštěný';

export default [{
    input: 'src/index.js',
    output: {
        file: 'index.js',
        format: 'cjs'
    },
    external: ['stream', 'util'],
    plugins: [
        eslint()
    ]
}, {
    input: 'src/tipograph.js',
    output: {
        file: 'dist/tipograph.js',
        format: 'iife',
        name: 'tipograph'
    },
    plugins: [
        eslint(),
        license({
            banner: banner
        })
    ]
}, {
    input: 'src/tipograph.js',
    output: {
        file: 'dist/tipograph.min.js',
        format: 'iife',
        name: 'tipograph'
    },
    plugins: [
        eslint({
            throwOnError: true
        }),
        terser(),
        gzip(),
        license({
            banner: banner
        })
    ]
}];
