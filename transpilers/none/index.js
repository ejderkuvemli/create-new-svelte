const Transpiler = require("../Transpiler");
const Handlebars = require('handlebars');

function NoTranspiler(app) {
    Transpiler.call(this, app);

    this.modifyFiles = function () {
        let appSvelte = app.fh.rtf('App.svelte.hbs');
        appSvelte = Handlebars.compile(appSvelte)({ js: true });
        app.fh.wpf(`/src/App.svelte`, appSvelte);
    }
}

module.exports = NoTranspiler;
