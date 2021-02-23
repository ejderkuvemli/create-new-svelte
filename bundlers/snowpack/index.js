const Bundler = require('../Bundler');
const plugins = require('./plugins.js');

function SnowpackBundler(app) {

    Bundler.call(this, app);

    this.type = 'node';

    this.in('path');

    this.s('clean', 'rimraf public/build/', ['rimraf']);
    this.s('dev', 'snowpack dev --port 5000', ['snowpack']);
    this.s('build', 'snowpack build', ['snowpack']);

    this.v('mode', () => (
        process.env.NODE_ENV || 'development'
    ));
    this.v('prod', () => (
        mode === 'production'
    ));

    this.transpiler.init();

    this.modifyFiles = () => {
        app.fh.etf('index.html.hbs', { bundleSrc: '/build/main.js', type: 'module' });
    }

}

module.exports = SnowpackBundler;