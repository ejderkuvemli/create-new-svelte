const path = require('path');
const Bundler = require('../Bundler');
const plugins = require('./plugins');

function WebpackBundler(app) {

    Bundler.call(this, app);
    this.r = function (rule) {
        rule = this.getFunc(rule);
        this.ap(rule);
        rule = rule.body.match(/\{([^]*)\}/g);
        this.config.rules.push(rule[0]);
    }

    this.type = 'node';
    this.in('path');
    this.app.packager.s('clean', 'rimraf public/build/', ['rimraf']);
    this.app.packager.s('build-dev', 'webpack --mode development', ['webpack', 'webpack-cli', 'webpack-dev-server']);
    this.app.packager.s('build-prod', 'webpack --mode production', ['webpack', 'webpack-cli', 'webpack-dev-server']);
    this.app.packager.s('dev', 'webpack serve --content-base public --mode development', ['webpack', 'webpack-cli', 'webpack-dev-server']);

    this.config.variables.push(`const mode = process.env.NODE_ENV || 'development';`);
    this.config.variables.push(`const prod = mode === 'production';`);

    if (this.app.needsPreprocess()) {
        this.r(plugins.svelteRuleWithPreprocess)
    }
    else {
        this.r(plugins.svelteRule)
    }
    this.r(plugins.cssRule);

    this.config.extensions.push('.mjs', '.js', '.svelte');

    this.transpiler = function (type) {
        switch (type) {
            case 'none':
                this.config.entry = `{ 'build/bundle': ['./src/main.js'] }`;
                break;
            case 'typescript':
                this.r(plugins.typescriptRule);
                this.config.entry = `{ 'build/bundle': ['./src/main.ts'] }`;
                this.config.extensions.push('.tsx', '.ts');
                break;
        }
    }
}

module.exports = WebpackBundler;