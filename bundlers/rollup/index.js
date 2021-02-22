const Bundler = require('../Bundler');
const plugins = require('./plugins');

function RollupBundler(app) {
    Bundler.call(this, app);

    this.v('prod', `!process.env.ROLLUP_WATCH`);

    this.s('clean', 'rimraf public/build', ['rimraf']);
    this.s('build', 'rollup -c', ['rollup']);
    this.s('dev', 'rollup -c -w', ['rollup']);
    this.s('start', 'sirv public --port 5000', ['sirv-cli']);

    this.p(plugins.cssPlugin);
    this.p(plugins.resolvePlugin);
    this.p(plugins.commonjsPlugin);
    this.p(plugins.servePlugin);
    this.p(plugins.livereloadPlugin);
    this.p(plugins.terserPlugin);

    this.transpiler.init();

    this.modifyFiles = () => {
        app.fh.etf('index.html.hbs', { bundleSrc: '/build/bundle.js', bundleCss: true });
    }

}

module.exports = RollupBundler;