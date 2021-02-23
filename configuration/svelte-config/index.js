const ConfigFile = require("../ConfigFile");

function SvelteConfig(app){
    ConfigFile.call(this, app);
    this.type = 'node';
    this.fileName = 'svelte.config.js';
    this.templateRoot = __dirname;

    this.app.packager.add('svelte');
    if(this.app.needsPreprocess()){
        this.i('svelte-preprocess');
    }
}

module.exports = SvelteConfig;