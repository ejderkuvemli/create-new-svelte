const SvelteConfig = require('../../configuration/svelte-config');
const Bundler = require('../Bundler');

function ParcelBundler(app) {

    Bundler.call(this, app);

    this.s('clean', 'rimraf public/build/', ['rimraf']);
    this.s('dev', 'run-p clean sirv-dev watch', ['npm-run-all', 'sirv-cli', 'parcel-bundler']);
    this.s('sirv-dev', 'sirv public -D --port 5000', ['sirv-cli']);

    this.app.config = new SvelteConfig(this.app);

    this.app.packager.add('parcel-plugin-svelte');
    this.mustExport = false;

    this.transpiler.init();

    this.modifyFiles = () => {
        app.fh.etf('index.html.hbs', { bundleSrc: '/build/bundle.js', bundleCss: true });
    }

}

module.exports = ParcelBundler;