const plugins = require('../../../plugins');

function CoffeeScriptTranspiler(bundler) {
    this.init = () => {
        bundler.p(plugins.sveltePlugin, () => ({
            compilerOptions: {
                dev: !prod
            },
            emitCss: prod,
            hotReload: !prod,
            preprocess: sveltePreprocess({ sourceMap: false })
        }), ['svelte-preprocess']);
        bundler.app.packager.add('coffeescript');
        bundler.p(plugins.coffeeScriptPlugin);

    }
}

module.exports = CoffeeScriptTranspiler;