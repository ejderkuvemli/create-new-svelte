const NoTranspiler = require('./none');
const TypescriptTranspiler = require('./typescript');

function TranspilerFactory(app) {
    
    this.create = function () {
        let transpiler;
        if (app.o.transpiler === "none") {
            transpiler = new NoTranspiler(app);
        } else if (app.o.transpiler === "typescript" || app.o.transpiler === "ts") {
            transpiler = new TypescriptTranspiler(app);
        }

        return transpiler;
    }
}

module.exports = TranspilerFactory;