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
    this.s('dev', 'webpack serve --content-base public --mode development --port 5000', ['webpack', 'webpack-cli', 'webpack-dev-server']);

    this.v('prod');

    this.r(plugins.cssRule);

    this.config.extensions.push('.mjs', '.js', '.svelte');

    this.transpiler.init();

    this.modifyFiles = () => {
        app.fh.etf('index.html.hbs', { bundleSrc: '/build/bundle.js' });
    }

}

module.exports = WebpackBundler;