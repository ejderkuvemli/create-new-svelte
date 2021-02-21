const path = require('path');
const Transpiler = require('../Transpiler');
const Handlebars = require('handlebars');

function CoffeeScriptTranspiler(app) {
    Transpiler.call(this, app);

    this.modifyFiles = function () {
        let mainJs = app.fh.rpf('/src/main.js').replace(/const app/, 'app');
        app.fh.wpf(`/src/main.js`, mainJs);
        app.fh.rn(`/src/main.js`, `/src/main.coffee`);

        let appSvelte = app.fh.rtf('App.svelte.hbs');
        appSvelte = Handlebars.compile(appSvelte)({ lang: 'coffee', cs: true });
        app.fh.wpf(`/src/App.svelte`, appSvelte);
    }
}

module.exports = CoffeeScriptTranspiler;
