
const Bundler = require('../Bundler');
const plugins = require('./plugins');

function RollupBundler(app) {
    Bundler.call(this, app);

    this.config.variables.push(`const production = !process.env.ROLLUP_WATCH;`);
    this.app.packager.s('clean', 'rimraf public/build', ['rimraf']);
    this.app.packager.s('build', 'rollup -c', ['rollup']);
    this.app.packager.s('dev', 'rollup -c -w', ['rollup']);
    this.app.packager.s('start', 'sirv public', ['sirv-cli']);

    if (this.app.needsPreprocess()) {
        this.p(plugins.sveltePluginWithPreprocess);
    }
    else {
        this.p(plugins.sveltePlugin);
    }
    this.p(plugins.cssPlugin);
    this.p(plugins.resolvePlugin);
    this.p(plugins.commonjsPlugin);
    this.p(plugins.servePlugin);
    this.p(plugins.livereloadPlugin);
    this.p(plugins.terserPlugin);

    this.transpiler = function (type) {
        switch (type) {
            case 'none':
                this.config.entry = `'src/main.js'`;
                break;
            case 'typescript':
                this.config.entry = `'src/main.ts'`;
                this.p(plugins.typescriptPlugin);
                break;
        }
    }
}


module.exports = RollupBundler;