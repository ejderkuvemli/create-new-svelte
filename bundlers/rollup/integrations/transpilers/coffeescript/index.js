const plugins = require('../../../plugins');

function CoffeeScriptTranspiler(bundler) {
    this.init = () => {
        bundler.config.entry = `'src/main.coffee'`;
        bundler.p(plugins.sveltePlugin, () => ({
            preprocess: sveltePreprocess(), // TODO: there is a problem with sourceMap
            compilerOptions: {
                // enable run-time checks when not in production
                dev: !prod
            }
        }), ['svelte-preprocess']);
        bundler.p(plugins.coffeeScriptPlugin);
    }
}

module.exports = CoffeeScriptTranspiler;