const path = require('path');
const Transpiler = require('../Transpiler');
const Handlebars = require('handlebars');

function CoffeeScriptTranspiler(app) {
    Transpiler.call(this, app);

    this.modifyFiles = function () {
        app.fh.etf('main.js.hbs', { const_app: 'app' }, '/src/main.coffee');
        app.fh.etf('App.svelte.hbs', { lang: 'coffee', cs: true });
    }
}

module.exports = CoffeeScriptTranspiler;
