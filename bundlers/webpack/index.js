const path = require('path');
const Bundler = require('../Bundler');
const plugins = require('./plugins.js');

function WebpackBundler(app) {

    Bundler.call(this, app);

    this.r = function (rule, options, imports) {
        rule = this.setPlugin(rule, options, imports);
        this.config.rules.push(rule.body);
    }

    this.type = 'node';

    this.in('path');

    this.s('clean', 'rimraf public/build/', ['rimraf']);
    this.s('build-dev', 'webpack --mode development', ['webpack', 'webpack-cli', 'webpack-dev-server']);
    this.s('build-prod', 'webpack --mode production', ['webpack', 'webpack-cli', 'webpack-dev-server']);
    this.s('dev', 'webpack serve --content-base public --mode development', ['webpack', 'webpack-cli', 'webpack-dev-server']);

    this.v('prod');

    this.r(plugins.cssRule);

    this.config.extensions.push('.mjs', '.js', '.svelte');

    this.transpiler.init();
}

module.exports = WebpackBundler;