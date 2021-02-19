const Transpiler = require("../Transpiler");

function NoTranspiler(app){
    Transpiler.call(this, app);

    app.bundler.transpiler('none');

}

module.exports = NoTranspiler;
