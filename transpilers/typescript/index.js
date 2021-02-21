const path = require('path');
const Transpiler = require('../Transpiler');
const Handlebars = require('handlebars');

function TypescriptTranspiler(app) {
    Transpiler.call(this, app);

    this.modifyFiles = function () {
        app.fh.rn(`/src/main.js`, `/src/main.ts`);

        let appSvelte = app.fh.rtf('App.svelte.hbs');
        appSvelte = Handlebars.compile(appSvelte)({ lang: 'ts', ts: true });
        app.fh.wpf(`/src/App.svelte`, appSvelte);
    }

    this.exportConfig = function () {
        this.configFile = 'tsconfig.json';
        let template = app.fh.rf(path.join(__dirname, './exports.hbs'));
        /* change config */

        app.fh.wf(path.join(app.dir, this.configFile), template);
    }
}

module.exports = TypescriptTranspiler;
