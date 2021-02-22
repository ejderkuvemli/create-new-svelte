const path = require('path');
const Transpiler = require('../Transpiler');
const Handlebars = require('handlebars');

function TypescriptTranspiler(app) {
    Transpiler.call(this, app);

    this.modifyFiles = function () {
        app.fh.etf('main.js.hbs', { const_app: 'const app' }, '/src/main.ts');
        app.fh.etf('App.svelte.hbs', { lang: 'ts', ts: true });
    }

    this.exportConfig = function () {
        this.configFile = 'tsconfig.json';
        let template = app.fh.rf(path.join(__dirname, './exports.hbs'));
        /* change config */

        app.fh.wf(path.join(app.dir, this.configFile), template);
    }
}

module.exports = TypescriptTranspiler;
