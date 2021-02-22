const plugins = require('../../../plugins');

function CoffeeScriptTranspiler(bundler) {
    this.init = () => {
        bundler.p(plugins.sveltePlugin, () => ({
            compilerOptions: {
                dev: !prod
            },
            emitCss: prod,
            hotReload: !prod,
            preprocess: sveltePreprocess()
        }), ['svelte-preprocess']);
        bundler.app.packager.add('coffeescript');
    }
}

module.exports = CoffeeScriptTranspiler;