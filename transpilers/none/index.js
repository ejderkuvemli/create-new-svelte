const Transpiler = require("../Transpiler");
const Handlebars = require('handlebars');

function NoTranspiler(app) {
    Transpiler.call(this, app);

    this.modifyFiles = function () {
        app.fh.etf('main.js.hbs', { const_app: 'const app' }, '/src/main.js');
        app.fh.etf('App.svelte.hbs', { js: true });
    }
}

module.exports = NoTranspiler;
