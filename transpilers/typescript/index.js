const path = require('path');
const Transpiler = require('../Transpiler');

function TypescriptTranspiler(app) {
    Transpiler.call(this, app);

    app.bundler.transpiler('typescript');

    this.modifyFiles = function () {
        app.fh.rn(`/src/main.js`, `/src/main.ts`);

        let appSvelte = app.fh.rpf('/src/App.svelte')
            .replace(/(?:<script)(( .*?)*?)>/gm, (m, attrs) => `<script${attrs}${!attrs.includes('lang="ts"') ? ' lang="ts"' : ''}>`)
            .replace(/export let name;/gm, 'export let name: string;');

        app.fh.wpf(`/src/App.svelte`, appSvelte);
        app.fh.cf('/index.html', `/public/index.html`);
    }

    this.exportConfig = function () {
        this.configFile = 'tsconfig.json';
        let template = app.fh.rf(path.join(__dirname, './config.template'));
        /* change config */

        app.fh.wf(path.join(app.dir, this.configFile), template);
    }
}

module.exports = TypescriptTranspiler;
