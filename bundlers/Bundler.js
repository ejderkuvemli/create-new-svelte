const path = require('path');
const ConfigFile = require('../configuration/ConfigFile');

function Bundler(app) {
    ConfigFile.call(this, app);

    try {
        const IntegratedTranspiler = require(`./${app.o.bundler}/integrations/transpilers/${app.o.transpiler}`);
        this.transpiler = new IntegratedTranspiler(this);
    }
    catch {
        this.transpiler = null;
    }

    this.templateRoot = path.join(__dirname, `/${app.o.bundler}`);
    this.modifyFiles = ()=> {}
}

module.exports = Bundler;