const mix = require('laravel-mix');
const LodashPlugin = require('lodash-webpack-plugin');
const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .autoload({}) //disable autoload of jquery, which we do not use and therefore do not need
    .js('resources/assets/js/app.jsx', 'public/js')
    .sass('resources/assets/css/app.scss', 'public/css')
    .sourceMaps()
    .version()
    //.browserSync({proxy: 'localhost:8080'})
    .webpackConfig({
        plugins: [
            new LodashPlugin()
        ],
        resolve: {
            alias: {
                CSS: path.resolve(__dirname, 'resources/assets/css'),
                JS: path.resolve(__dirname, 'resources/assets/js'),
            }
        }
    });

/*
 |
 |--------------------------------------------------------------------------
 | Generate webpack.config.js to provide autocompletion to editors and IDEs that can understand it
 |--------------------------------------------------------------------------
 |
 */
Mix.listen('configReady', (config) => {
    const fs = require('fs');

    let cache = [];
    const json = JSON.stringify(config, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return;
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    }, 2);

    fs.writeFile(path.resolve(__dirname, 'webpack.config.js'),
        `// This file has been autogenerated and should not be modified nor committed.
// It is used to provide autocompletion to editors and IDEs that support webpack.config.js
// See 'webpack.mix.js' instead.
module.exports = ${json};
`);
});