const Transpiler = require("../Transpiler");

function NoTranspiler(app){
    Transpiler.call(this, app);

    app.bundler.transpiler('none');

    this.modifyFiles = function() {
        app.fh.cf('/index.html', `/public/index.html`);
        app.fh.cf('/App.svelte', `/src/App.svelte`);
    }
}

module.exports = NoTranspiler;
